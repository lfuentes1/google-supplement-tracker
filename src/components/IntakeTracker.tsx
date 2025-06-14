import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, ChevronUp, ChevronDown, CalendarIcon } from "lucide-react";
import { Supplement } from "./Supplements";
import { dailyValues, DailyValue } from "@/data/dailyValues";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

interface IntakeTrackerProps {
  supplements: Supplement[];
  activeSupplementIds: Set<string>;
}

interface NutrientData {
    name: string;
    intake: { amount: number | string; unit: string };
    dv: DailyValue | undefined;
}

const NutrientTable = ({ nutrients, category }: { nutrients: NutrientData[], category: "Vitamins" | "Minerals" }) => {
    const isVitamin = (name: string) => /vitamin|thiamin|riboflavin|niacin|folate|biotin|pantothenic/i.test(name);
    const isMineral = (name: string) => !isVitamin(name);

    const filteredNutrients = nutrients.filter(n => category === "Vitamins" ? isVitamin(n.name) : isMineral(n.name));
    
    if (filteredNutrients.length === 0) return null;

    return (
        <div className="space-y-2">
            <h4 className="font-semibold text-md">{category === "Vitamins" ? "Vitamin" : "Mineral"}</h4>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{category === "Vitamins" ? "Vitamin" : "Mineral"}</TableHead>
                        <TableHead>DV</TableHead>
                        <TableHead>Your Intake</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredNutrients.map(({ name, intake, dv }) => {
                        const intakeAmount = typeof intake.amount === 'number' ? intake.amount : 0;
                        const dvAmount = dv?.amount ?? 0;
                        const percentage = dvAmount > 0 && intakeAmount > 0 ? Math.round((intakeAmount / dvAmount) * 100) : 0;
                        const meetsDv = dvAmount > 0 && intakeAmount >= dvAmount;

                        return (
                            <TableRow key={name}>
                                <TableCell className="font-medium">{name}</TableCell>
                                <TableCell>{dv ? `${dv.amount} ${dv.unit}` : 'N/A'}</TableCell>
                                <TableCell className={cn(meetsDv ? 'text-green-600' : 'text-red-600')}>
                                    {`${intake.amount} ${intake.unit} (${percentage}%)`}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};


const IntakeTracker = ({ supplements, activeSupplementIds }: IntakeTrackerProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [intakeEnabled, setIntakeEnabled] = useState(false);
    const [activeOpen, setActiveOpen] = useState(true);
    const [insufficientOpen, setInsufficientOpen] = useState(true);

    const activeSupplements = intakeEnabled ? supplements.filter(s => activeSupplementIds.has(s.id)) : [];

    const aggregatedIntake = activeSupplements
        .flatMap(s => s.nutritionFacts)
        .reduce((acc, fact) => {
            if (typeof fact.amount === 'number' && fact.name) {
                const existing = acc.get(fact.name);
                if (existing) {
                    if (existing.unit === fact.unit) {
                        acc.set(fact.name, { ...existing, amount: existing.amount + fact.amount });
                    }
                } else {
                    acc.set(fact.name, {
                        unit: fact.unit,
                        amount: fact.amount
                    });
                }
            }
            return acc;
        }, new Map<string, { amount: number; unit: string }>());

    const activeNutrients: NutrientData[] = Array.from(aggregatedIntake.entries()).map(([name, intake]) => {
        const dv = dailyValues[name];
        return { name, intake, dv };
    });

    const activeNutrientNames = new Set(aggregatedIntake.keys());
    const insufficientNutrients: NutrientData[] = Object.entries(dailyValues)
        .filter(([name]) => !activeNutrientNames.has(name))
        .map(([name, dv]) => {
            return { name, intake: { amount: 0, unit: dv.unit }, dv };
        });

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span>Intake Tracker</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4 py-4 border-b">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-auto justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Switch
                        checked={intakeEnabled}
                        onCheckedChange={setIntakeEnabled}
                    />
                </div>

                <Collapsible open={activeOpen} onOpenChange={setActiveOpen} className="border rounded-lg">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg bg-green-100 text-green-800 rounded-t-lg hover:bg-green-200/70 transition-colors">
                        <span>Active Vitamins & Minerals ({activeNutrients.length})</span>
                        {activeOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-4">
                        {activeNutrients.length > 0 ? (
                            <>
                                <NutrientTable nutrients={activeNutrients} category="Vitamins" />
                                <NutrientTable nutrients={activeNutrients} category="Minerals" />
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-2">{intakeEnabled ? "Select supplements to see active nutrients." : "Enable daily intake to see active nutrients."}</p>
                        )}
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={insufficientOpen} onOpenChange={setInsufficientOpen} className="border rounded-lg">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-semibold text-lg bg-red-100 text-red-800 rounded-t-lg hover:bg-red-200/70 transition-colors">
                        <span>Insufficient Vitamins & Minerals ({insufficientNutrients.length})</span>
                        {insufficientOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 space-y-4">
                        {insufficientNutrients.length > 0 ? (
                            <>
                                <NutrientTable nutrients={insufficientNutrients} category="Vitamins" />
                                <NutrientTable nutrients={insufficientNutrients} category="Minerals" />
                            </>
                        ) : (
                             <p className="text-sm text-muted-foreground text-center py-2">All recommended nutrients are active!</p>
                        )}
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
};

export default IntakeTracker;
