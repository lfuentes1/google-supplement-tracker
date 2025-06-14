
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddSupplementForm } from "./AddSupplementForm";
import React from "react";
import MySupplements from "./MySupplements";

export interface NutritionFact {
  id: string;
  name: string;
  amount: number | string;
  unit: string;
}

export interface Supplement {
  id: string;
  name: string;
  frontOfContainer?: File;
  supplementLabel?: File;
  nutritionFacts: NutritionFact[];
}

interface SupplementsProps {
  supplements: Supplement[];
  activeSupplementIds: Set<string>;
  onAddSupplement: (data: { supplementName: string; frontOfContainer?: File; supplementLabel?: File }) => void;
  onDeleteSupplement: (id: string) => void;
  onUpdateSupplement: (id: string, updatedSupplement: Supplement) => void;
  onToggleSupplement: (id: string, checked: boolean) => void;
}

const Supplements = ({
  supplements,
  activeSupplementIds,
  onAddSupplement,
  onDeleteSupplement,
  onUpdateSupplement,
  onToggleSupplement,
}: SupplementsProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary" />
          <span>Supplements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg">
            <AccordionTrigger className="p-4">Add Supplement</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <AddSupplementForm onAddSupplement={onAddSupplement} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-lg">
            <AccordionTrigger className="p-4">My Supplements</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <MySupplements
                supplements={supplements}
                activeSupplementIds={activeSupplementIds}
                onDelete={onDeleteSupplement}
                onUpdate={onUpdateSupplement}
                onToggle={onToggleSupplement}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Supplements;
