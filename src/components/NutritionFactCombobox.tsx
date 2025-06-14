
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dailyValues } from "@/data/dailyValues"

const nutritionFacts = Object.keys(dailyValues).map(name => ({
  value: name.toLowerCase(),
  label: name,
}));

interface NutritionFactComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function NutritionFactCombobox({ value, onChange, disabled }: NutritionFactComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {value
            ? nutritionFacts.find((fact) => fact.label.toLowerCase() === value.toLowerCase())?.label
            : "Select nutrition fact..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1
            return 0
          }}>
          <CommandInput placeholder="Search nutrition fact..." />
          <CommandList>
            <CommandEmpty>No nutrition fact found.</CommandEmpty>
            <CommandGroup>
              {nutritionFacts.map((fact) => (
                <CommandItem
                  key={fact.value}
                  value={fact.label}
                  onSelect={(currentValue) => {
                    const selectedFact = nutritionFacts.find(f => f.label.toLowerCase() === currentValue.toLowerCase());
                    onChange(selectedFact ? selectedFact.label : "")
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.toLowerCase() === fact.label.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {fact.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
