import * as React from "react";

type QuickStressLevelSelectButtonProps = {
  level: number;
  label: string;
  description: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  selected: boolean;
  onClick: (level: number) => void;
};

export function QuickStressLevelSelectButton({
  level,
  label,
  description,
  IconComponent,
  selected,
  onClick,
}: QuickStressLevelSelectButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(level)}
      className={`grid grid-rows-subgrid row-span-4 w-full p-3 rounded-lg font-semibold transition-all border-2 cursor-pointer ${
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
          : "border-muted bg-muted/30 hover:bg-muted/50 hover:border-primary/50"
      }`}
    >
      <div className="flex justify-center">
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex justify-center items-center text-lg">{level}%</div>
      <div className="flex justify-center items-center font-bold text-xs">
        {label}
      </div>
      <div className="flex justify-center items-center text-xs opacity-75 text-center leading-tight">
        {description}
      </div>
    </button>
  );
}
