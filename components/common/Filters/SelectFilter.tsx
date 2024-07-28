"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFilterOption } from "@/lib/types";

type TProps = {
  options: TFilterOption[];
  placeholder?: string;
  filterLabel?: string;
};

const SelectFilter = ({
  options,
  placeholder = "",
  filterLabel = "",
}: TProps) => {
  const [val, setVal] = useState<string>("");

  return (
    <Select
      onValueChange={(value) => {
        setVal(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>{filterLabel}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.option}>
              {option.option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
