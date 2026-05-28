import { Label } from "@/components/shadcn/label";
import { Slider } from "@/components/shadcn/slider";
import { QuickStressLevelSelectButtons } from "./components/QuickStressLevelSelectButtons";

type StressLevelSelectProps = {
  name: string;
  value: number;
  onChange: (value: number) => void;
};

export function StressLevelSelect({
  name,
  value,
  onChange,
}: StressLevelSelectProps) {
  return (
    <>
      <Label htmlFor={name} className="text-base">
        Stress level
      </Label>
      <QuickStressLevelSelectButtons value={value} onChange={onChange} />
      <div className="flex justify-between text-sm gap-2.25 items-center mt-2.5">
        <Slider
          id={name}
          min={0}
          max={100}
          step={1}
          value={[value]}
          onValueChange={([val]) => onChange(val)}
        />
        <span className="text-muted-foreground">{value}%</span>
      </div>
    </>
  );
}
