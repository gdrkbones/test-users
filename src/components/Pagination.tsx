import Select from "react-select";

export type PaginationProps = {
  current: number;
  maxPages: number;
  onChange: (pag: number) => void;
};

const Pagination = ({ current, maxPages, onChange }: PaginationProps) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          onChange(current - 1);
        }}
        className="h-10 w-10 text-xl font-extrabold text-blue-800"
        disabled={current === 1}
      >
        {"<"}
      </button>
      <Select
        value={{ value: current, label: current }}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={Array(maxPages)
          .fill("")
          .map((_, i) => ({
            value: i + 1,
            label: i + 1,
          }))}
        onChange={(option) => onChange(option?.value || 1)}
      />
      <button
        onClick={() => {
          onChange(current + 1);
        }}
        className="h-10 w-10 text-xl font-extrabold text-blue-800"
        disabled={current === maxPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
