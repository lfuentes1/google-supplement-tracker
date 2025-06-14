
```typescript
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
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const addSupplementFormSchema = z.object({
  supplementName: z.string().min(1, {
    message: "Supplement name is required.",
  }),
  frontOfContainer: z.instanceof(File).optional(),
  nutritionLabel: z.instanceof(File).optional(),
});

type AddSupplementFormValues = z.infer<typeof addSupplementFormSchema>;

// Mock function to simulate OCR/text extraction from an image
const getSupplementNameFromImage = async (file: File): Promise<string> => {
  console.log("Simulating OCR on file:", file.name);
  // In a real app, you would use an OCR service here.
  // For this demo, we'll parse the filename after a short delay.
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Remove the file extension
  let name = file.name.split('.').slice(0, -1).join('.') || file.name;

  // Clean up the name by removing common keywords and extra spaces
  name = name
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/(front|of|container|label|image|img|pic)/gi, '') // Remove common keywords
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();

  // Capitalize the first letter of each word
  const capitalizedName = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return capitalizedName || "Could not determine name";
};

export function AddSupplementForm({ onAddSupplement }: { onAddSupplement: (data: AddSupplementFormValues) => void }) {
  const form = useForm<AddSupplementFormValues>({
    resolver: zodResolver(addSupplementFormSchema),
    defaultValues: {
      supplementName: "",
    },
    mode: "onChange",
  });

  const supplementNameValue = form.watch("supplementName");

  const ImageDropzone = ({
    label,
    fieldName,
  }: {
    label: string;
    fieldName: "frontOfContainer" | "nutritionLabel";
  }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const file = form.watch(fieldName);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        form.setValue(fieldName, file, { shouldValidate: true });
        if (fieldName === "frontOfContainer") {
          toast.info("Extracting supplement name from image...");
          try {
            const name = await getSupplementNameFromImage(file);
            form.setValue("supplementName", name, { shouldValidate: true });
            toast.success("Supplement name populated!");
          } catch (error) {
            toast.error("Could not extract name from image.");
          }
        }
      }
    };

    return (
      <div className="w-full space-y-2">
        <Label>{label}</Label>
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-gray-100 dark:hover:bg-gray-800",
            {
              "border-primary": file,
            }
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? (
            <div className="flex items-center gap-2 p-2 text-sm text-foreground">
              <FileText className="h-6 w-6 text-primary" />
              <span className="truncate max-w-40">{file.name}</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-muted-foreground">Click to upload</p>
            </>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  };

  function onSubmit(data: AddSupplementFormValues) {
    toast.success(`${data.supplementName} added to your list!`);
    onAddSupplement(data);
    form.reset({
      supplementName: "",
      frontOfContainer: undefined,
      nutritionLabel: undefined,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <ImageDropzone
            label="Front of Container"
            fieldName="frontOfContainer"
          />
          <ImageDropzone label="Nutrition Label" fieldName="nutritionLabel" />
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

        <Button type="submit" disabled={!supplementNameValue} className="w-full">
          Add Supplement
        </Button>
      </form>
    </Form>
  );
}
```
