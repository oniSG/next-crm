"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import {
  PRESETS,
  type DateRange,
  type PresetKey,
  findPresetKey,
  formatDateInput,
  formatDateRange,
  parseDateInput,
} from "./date-presets";

type DateRangeFilterProps = {
  value: DateRange;
  onChange: (value: DateRange) => void;
  today?: Date;
  className?: string;
};

export function DateRangeFilter({
  value,
  onChange,
  today = new Date(),
  className,
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [fromInput, setFromInput] = useState(formatDateInput(value.from));
  const [toInput, setToInput] = useState(formatDateInput(value.to));

  const activeKey = findPresetKey(value, today);
  const activeLabel =
    PRESETS.find((p) => p.key === activeKey)?.label ?? "Custom";

  function handleOpenChange(next: boolean) {
    if (next) {
      setFromInput(formatDateInput(value.from));
      setToInput(formatDateInput(value.to));
    }
    setOpen(next);
  }

  function handlePreset(key: PresetKey) {
    const preset = PRESETS.find((p) => p.key === key);
    if (!preset) return;
    onChange(preset.getRange(today));
    setOpen(false);
  }

  function handleFromBlur() {
    const parsed = parseDateInput(fromInput);
    if (parsed && parsed <= value.to) {
      onChange({ from: parsed, to: value.to });
    } else {
      setFromInput(formatDateInput(value.from));
    }
  }

  function handleToBlur() {
    const parsed = parseDateInput(toInput);
    if (parsed && parsed >= value.from) {
      onChange({ from: value.from, to: parsed });
    } else {
      setToInput(formatDateInput(value.to));
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className={cn("gap-2", className)}
            aria-label="Change date range"
          >
            <Badge variant="secondary" className="font-medium">
              {activeLabel}
            </Badge>
            <span className="text-sm">{formatDateRange(value)}</span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        }
      />
      <PopoverContent className="w-72 p-0" align="end">
        <div className="grid grid-cols-2 gap-2 p-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="date-range-from"
              className="text-xs text-muted-foreground"
            >
              Start date
            </label>
            <Input
              id="date-range-from"
              value={fromInput}
              onChange={(e) => setFromInput(e.target.value)}
              onBlur={handleFromBlur}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="date-range-to"
              className="text-xs text-muted-foreground"
            >
              End date
            </label>
            <Input
              id="date-range-to"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onBlur={handleToBlur}
            />
          </div>
        </div>
        <Separator />
        <Command className="rounded-none bg-transparent">
          <CommandList>
            {PRESETS.map((preset) => (
              <CommandItem
                key={preset.key}
                value={preset.key}
                onSelect={() => handlePreset(preset.key)}
                className={cn(
                  activeKey === preset.key &&
                    "bg-primary/10 font-medium text-primary",
                )}
              >
                {preset.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
