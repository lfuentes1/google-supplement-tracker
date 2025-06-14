
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, CheckCircle, FileText, X, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const addSupplementFormSchema = z.object({
  supplementName: z.string().min(1, {
    message: "Supplement name is required.",
  }),
  servingSize: z.preprocess((val) => (val === "" ? undefined : val), z.coerce.number({invalid_type_error: "Must be a number"}).positive("Must be positive").optional()),
  servingUnit: z.string().optional(),
  frontOfContainer: z.any().optional(),
  supplementLabel: z.any().optional(),
});

type AddSupplementFormValues = z.infer<typeof addSupplementFormSchema>;

// Mock function to simulate OCR/text extraction from an image
const getSupplementNameFromImage = async (file: File): Promise<string> => {
  console.log("Simulating OCR on file:", file.name);
  // In a real app, you would use an OCR service here.
  // For this demo, we'll parse the filename to get a name.
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network latency

  const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.') || file.name;
  
  const cleanedName = nameWithoutExtension
    .replace(/_/g, ' ') // replace underscores with spaces
    .replace(/-/g, ' ') // replace hyphens with spaces
    .replace(/\b(front|label|container|image|img|pic)\b/gi, '') // remove common keywords
    .trim();

  // Capitalize first letter of each word
  const finalName = cleanedName
    .split(' ')
    .filter(Boolean) // remove empty strings from double spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return finalName || "Unknown Supplement";
};

export function AddSupplementForm({ onAddSupplement }: { onAddSupplement: (data: AddSupplementFormValues) => void }) {
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AddSupplementFormValues>({
    resolver: zodResolver(addSupplementFormSchema),
    defaultValues: {
      supplementName: "",
      servingUnit: "capsules",
    },
    mode: "onChange",
  });

  const supplementNameValue = form.watch("supplementName");

  const ImageDropzone = ({
    label,
    fieldName,
  }: {
    label: string;
    fieldName: "frontOfContainer" | "supplementLabel";
  }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const file = form.watch(fieldName);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        form.setValue(fieldName, selectedFile, { shouldValidate: true });
        toast.success(`${selectedFile.name} selected.`);
        
        if (fieldName === "frontOfContainer") {
          setIsExtracting(true);
          toast.info("Extracting supplement name from image...");
          try {
            const name = await getSupplementNameFromImage(selectedFile);
            form.setValue("supplementName", name, { shouldValidate: true });
            toast.success(`Supplement name populated: ${name}`);
          } catch (error) {
            toast.error("Could not extract supplement name.");
          } finally {
            setIsExtracting(false);
          }
        }
      }
    };

    const handleClearFile = (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent opening file dialog
      form.setValue(fieldName, undefined, { shouldValidate: true });
      if (fieldName === 'frontOfContainer') {
        form.setValue('supplementName', '', { shouldValidate: true });
      }
      toast.info('File removed.');
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const isLoading = fieldName === 'frontOfContainer' && isExtracting;

    return (
      <div className="w-full space-y-2">
        <Label>{label}</Label>
        <div
          className={`relative flex flex-col items-center justify-center w-full h-20 sm:h-24 border-2 border-dashed rounded-lg transition-colors
            ${isLoading ? 'cursor-not-allowed bg-gray-50 dark:bg-gray-800/50' : 'cursor-pointer'}
            ${file && !isLoading ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
            ${!file && !isLoading ? 'bg-card hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
          `}
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-spin" />
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Extracting name...</p>
            </div>
          ) : file ? (
            <div className="flex items-center w-full h-full p-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                {fieldName === 'frontOfContainer' ? <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /> : <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />}
                <div className="truncate">
                    <p className="font-semibold truncate" title={file.name}>{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                    </p>
                </div>
                </div>
                <button type="button" onClick={handleClearFile} className="ml-2 p-1 text-muted-foreground hover:text-destructive rounded-full absolute top-1 right-1">
                    <X className="h-4 w-4" />
                </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Click or drag & drop</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>
      </div>
    );
  };

  async function onSubmit(data: AddSupplementFormValues) {
    setIsSubmitting(true);
    try {
      // Simulate a short delay for submission
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success(`${data.supplementName} added to your list!`);
      onAddSupplement(data);
      form.reset();
    } catch (error) {
      toast.error("Failed to add supplement.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <ImageDropzone
            label="Front of Container"
            fieldName="frontOfContainer"
          />
          <ImageDropzone label="Supplement Label" fieldName="supplementLabel" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="servingSize"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Serving Size</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="e.g., 2" 
                                {...field} 
                                step="0.1"
                                value={field.value ?? ''}
                                onChange={event => field.onChange(event.target.value)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="servingUnit"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a unit" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="capsules">capsules</SelectItem>
                                <SelectItem value="tablets">tablets</SelectItem>
                                <SelectItem value="ml">ml</SelectItem>
                                <SelectItem value="g">g</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="supplementName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplement Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., multivitamin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!supplementNameValue || isExtracting || isSubmitting} className="w-full">
          {isExtracting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting name...
            </>
          ) : isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Supplement...
            </>
          ) : (
            "Add Supplement"
          )}
        </Button>
      </form>
    </Form>
  );
}
