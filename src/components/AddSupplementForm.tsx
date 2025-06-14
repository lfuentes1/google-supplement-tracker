
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
import { UploadCloud } from "lucide-react";

const addSupplementFormSchema = z.object({
  supplementName: z.string().min(1, {
    message: "Supplement name is required.",
  }),
  frontOfContainer: z.any().optional(),
  nutritionLabel: z.any().optional(),
});

type AddSupplementFormValues = z.infer<typeof addSupplementFormSchema>;

// Mock function to simulate OCR/text extraction from an image
const getSupplementNameFromImage = async (file: File): Promise<string> => {
  console.log("Simulating OCR on file:", file.name);
  // In a real app, you would use an OCR service here.
  // For this demo, we'll return a mock name after a short delay.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return "Premium Multivitamin";
};

export function AddSupplementForm() {
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        form.setValue(fieldName, file);
        if (fieldName === "frontOfContainer") {
          toast.info("Extracting supplement name from image...");
          const name = await getSupplementNameFromImage(file);
          form.setValue("supplementName", name, { shouldValidate: true });
          toast.success("Supplement name populated!");
        }
      }
    };

    return (
      <div className="w-full space-y-2">
        <Label>{label}</Label>
        <div
          className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-muted-foreground">or drag & drop</p>
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
    console.log("Supplement Added:", data);
    toast.success("Supplement added successfully!");
    form.reset();
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
