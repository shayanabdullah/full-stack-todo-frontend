import { ChevronDown, Check } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const FilterDropdown = ({
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const ref = useOutsideClick(() => {
    if (isOpen) onToggle();
  });

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-2 px-4 py-2 border rounded-lg bg-background min-w-36"
      >
        <span className="text-sm capitalize">
          {value}
        </span>

        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-muted"
            >
              <span className="capitalize">
                {option}
              </span>

              {value === option && (
                <Check
                  size={16}
                  className="text-primary"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;