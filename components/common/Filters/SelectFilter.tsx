"use client";

import React, { useState } from "react";
import { TFilterOption } from "@/lib/types";

type TProps = {
  options: TFilterOption[];
  placeholder?: string;
  filterLabel?: string;
};

const SelectFilter = ({ options }: TProps) => {
  const optionsSorted = options.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return (
    <select className="p-2 flex text-center pr-2">
      {optionsSorted.map((option) => (
        <option key={option.id} value={option.option}>
          {option.option}
        </option>
      ))}
    </select>
  );
};

export default SelectFilter;
