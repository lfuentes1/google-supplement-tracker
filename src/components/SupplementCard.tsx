
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, X, Plus } from 'lucide-react';
import { Supplement, NutritionFact } from './Supplements';
import { toast } from 'sonner';

interface SupplementCardProps {
    supplement: Supplement;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedSupplement: Supplement) => void;
}

const SupplementCard = ({ supplement, onDelete, onUpdate }: SupplementCardProps) => {

    const handleFactChange = (factId: string, field: keyof Omit<NutritionFact, 'id'>, value: string | number) => {
        const updatedFacts = supplement.nutritionFacts.map(fact =>
            fact.id === factId ? { ...fact, [field]: value } : fact
        );
        onUpdate(supplement.id, { ...supplement, nutritionFacts: updatedFacts });
    };

    const handleAddFact = () => {
        const newFact: NutritionFact = {
            id: Date.now().toString(),
            name: '',
            amount: '',
            unit: 'mg'
        };
        onUpdate(supplement.id, { ...supplement, nutritionFacts: [...supplement.nutritionFacts, newFact] });
    };

    const handleDeleteFact = (factId: string) => {
        const updatedFacts = supplement.nutritionFacts.filter(fact => fact.id !== factId);
        onUpdate(supplement.id, { ...supplement, nutritionFacts: updatedFacts });
    };

    const handleIntelliAdd = () => {
        if (supplement.nutritionFacts.length > 0) {
            toast.info("Nutrition facts have already been added.");
            return;
        }
        toast.info("IntelliAdd is scanning your nutrition label...");
        // Mock async operation
        setTimeout(() => {
            const mockFacts: NutritionFact[] = [
                { id: Date.now().toString() + '1', name: 'Vitamin C', amount: 90, unit: 'mg' },
                { id: Date.now().toString() + '2', name: 'Vitamin A', amount: 900, unit: 'mcg' },
                { id: Date.now().toString() + '3', name: 'Vitamin D', amount: 20, unit: 'mcg' },
            ];
             onUpdate(supplement.id, { ...supplement, nutritionFacts: [...supplement.nutritionFacts, ...mockFacts] });
             toast.success("Nutrition facts populated!");
        }, 1500);
    };

    return (
        <Accordion type="single" collapsible className="w-full bg-card border rounded-lg">
            <AccordionItem value={supplement.id} className="border-b-0">
                <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-left pr-2">{supplement.name}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="text-purple-500 hover:bg-purple-100 hover:text-purple-600 h-8 w-8" onClick={(e) => { e.stopPropagation(); handleIntelliAdd(); }}>
                                <Sparkles className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100 hover:text-red-600 h-8 w-8" onClick={(e) => { e.stopPropagation(); onDelete(supplement.id); }}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                    <div className="space-y-3">
                        {supplement.nutritionFacts.length > 0 ? (
                            supplement.nutritionFacts.map(fact => (
                            <div key={fact.id} className="grid grid-cols-[1fr,auto,auto,auto] gap-2 items-center">
                                <Input
                                    placeholder="e.g. Vitamin C"
                                    value={fact.name}
                                    onChange={(e) => handleFactChange(fact.id, 'name', e.target.value)}
                                />
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={fact.amount}
                                    onChange={(e) => handleFactChange(fact.id, 'amount', e.target.value ? parseFloat(e.target.value) : '')}
                                    className="w-24"
                                />
                                <Select value={fact.unit} onValueChange={(value) => handleFactChange(fact.id, 'unit', value)}>
                                    <SelectTrigger className="w-28">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mg">mg</SelectItem>
                                        <SelectItem value="g">g</SelectItem>
                                        <SelectItem value="mcg">mcg</SelectItem>
                                        <SelectItem value="IU">IU</SelectItem>
                                        <SelectItem value="capsules">capsules</SelectItem>
                                        <SelectItem value="tablets">tablets</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleDeleteFact(fact.id)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-2">No nutrition facts added yet. Use IntelliAdd or add one manually.</p>
                        )}
                         <Button variant="outline" size="sm" onClick={handleAddFact} className="mt-2 w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Nutrition Fact
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default SupplementCard;
