
import React, { useState } from "react";
import Supplements from "@/components/Supplements";
import type { Supplement } from "@/components/Supplements";
import IntakeTracker from "@/components/IntakeTracker";
import Insights from "@/components/Insights";

const Index = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [activeSupplementIds, setActiveSupplementIds] = useState<Set<string>>(new Set());

  const handleAddSupplement = (data: { supplementName: string; servingSize?: number; servingUnit?: string; frontOfContainer?: File; supplementLabel?: File }) => {
    const newSupplement: Supplement = {
      id: Date.now().toString(),
      name: data.supplementName,
      servingSize: data.servingSize,
      servingUnit: data.servingUnit,
      frontOfContainer: data.frontOfContainer,
      supplementLabel: data.supplementLabel,
      nutritionFacts: [],
    };
    setSupplements(prev => [...prev, newSupplement]);
  };

  const handleDeleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
    setActiveSupplementIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }

  const handleUpdateSupplement = (id: string, updatedSupplement: Supplement) => {
    setSupplements(prev => prev.map(s => s.id === id ? updatedSupplement : s));
  }
  
  const handleToggleSupplement = (id: string, checked: boolean) => {
    setActiveSupplementIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-gray-900">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800">IntelliDose</h1>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Supplements
            supplements={supplements}
            activeSupplementIds={activeSupplementIds}
            onAddSupplement={handleAddSupplement}
            onDeleteSupplement={handleDeleteSupplement}
            onUpdateSupplement={handleUpdateSupplement}
            onToggleSupplement={handleToggleSupplement}
          />
          <IntakeTracker
             supplements={supplements}
             activeSupplementIds={activeSupplementIds}
          />
          <Insights />
        </div>
      </main>
    </div>
  );
};

export default Index;
