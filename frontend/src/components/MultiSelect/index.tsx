import { useState, useEffect, useRef } from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface MultiSelectProps<T extends FieldValues> {
  options: { name: string; value: string }[];
  name: Path<T>;
  control: Control<T>;
}

export const MultiSelect = <T extends FieldValues>({
  options,
  name,
  control,
}: MultiSelectProps<T>) => {
  const { field } = useController({ name, control });
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newValues);
    field.onChange(newValues);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-[368px] border-2 border-slate-500 rounded-md">
      <div
        className="p-2 bg-slate-800 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => options.find((option) => option.value === value)?.name).join(", ")
        ) : (
          <span className="text-gray-500">Select options</span>
        )}
      </div>
      {menuOpen && (
        <div className="absolute w-full max-h-[120px] overflow-auto bg-slate-600 border border-gray-300 rounded mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer ${selectedValues.includes(option.value) ? "bg-orange-500 text-white" : ""}`}
              onClick={() => toggleValue(option.value)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
