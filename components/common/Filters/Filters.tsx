import { TFilterOption } from "@/lib/types";
import SelectFilter from "./SelectFilter";

type TProps = {
  options: TFilterOption[];
  filterType: "select";
};

const Filters = ({ options, filterType }: TProps) => {
  switch (filterType) {
    case "select":
      return <SelectFilter options={options} />;
  }
};

export default Filters;
