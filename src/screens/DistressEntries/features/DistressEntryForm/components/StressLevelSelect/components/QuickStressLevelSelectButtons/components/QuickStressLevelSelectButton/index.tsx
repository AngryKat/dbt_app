import * as React from "react";

type QuickStressLevelSelectButtonProps = {
  level: [number, number];
  label: string;
  description: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  selected: boolean;
  value: number;
  color: string;
  onClick: (level: number) => void;
};

export function QuickStressLevelSelectButton({
  label,
  description,
  IconComponent,
  selected,
  value,
  color,
  onClick,
}: QuickStressLevelSelectButtonProps) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        backgroundColor: color,
        color: "white",
      }}
      className={`grid grid-rows-subgrid row-span-4 w-full p-2 rounded-lg font-semibold transition-all border-2 cursor-pointer focus-visible:border-4 focus-visible:border-gray-100 ${selected
        ? "border-primary shadow-lg scale-105"
        : "hover:opacity-80"
        }`}
    >
      <div className="flex justify-center">
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex justify-center items-center text-sm">{label}</div>
      <div className="flex justify-center items-center text-xs opacity-75 text-center leading-tight">
        {description}
      </div>
    </button>
  );
}
