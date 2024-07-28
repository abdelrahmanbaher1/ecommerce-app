import { TFilterOption } from "@/lib/types";
import SelectFilter from "./SelectFilter";

type TProps = {
  options: TFilterOption[];
  filterType: "select";
  placeholder?: string;
  filterLabel?: string;
};

const Filters = ({
  options,
  filterType,
  placeholder = "",
  filterLabel = "",
}: TProps) => {
  switch (filterType) {
    case "select":
      return (
        <SelectFilter
          options={options}
          placeholder={placeholder}
          filterLabel={filterLabel}
        />
      );
  }
};

export default Filters;
