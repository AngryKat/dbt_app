import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
      <div className="flex justify-between text-sm">
        <Label htmlFor={name} className="text-base">
          Stress level
        </Label>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Slider
        id={name}
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
      />

      {/* Quick select buttons */}
      <QuickStressLevelSelectButtons value={value} onChange={onChange} />
    </>
  );
}
