
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddSupplementForm } from "./AddSupplementForm";
import React, { useState } from "react";
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
  nutritionLabel?: File;
  nutritionFacts: NutritionFact[];
}

const Supplements = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  const handleAddSupplement = (data: { supplementName: string; frontOfContainer?: File; nutritionLabel?: File }) => {
    const newSupplement: Supplement = {
      id: Date.now().toString(),
      name: data.supplementName,
      frontOfContainer: data.frontOfContainer,
      nutritionLabel: data.nutritionLabel,
      nutritionFacts: [],
    };
    setSupplements(prev => [...prev, newSupplement]);
  };

  const handleDeleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
  }

  const handleUpdateSupplement = (id: string, updatedSupplement: Supplement) => {
    setSupplements(prev => prev.map(s => s.id === id ? updatedSupplement : s));
  }

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
              <AddSupplementForm onAddSupplement={handleAddSupplement} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-lg">
            <AccordionTrigger className="p-4">My Supplements</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <MySupplements
                supplements={supplements}
                onDelete={handleDeleteSupplement}
                onUpdate={handleUpdateSupplement}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default Supplements;
