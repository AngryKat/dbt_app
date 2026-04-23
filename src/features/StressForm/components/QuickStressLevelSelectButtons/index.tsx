import { QuickStressLevelSelectButton } from "./components/QuickStressLevelSelectButton";
import {
  Sun,
  CloudSun,
  CloudSunRain,
  CloudRainWind,
  CloudLightning,
} from "lucide-react";

type QuickStressLevelSelectButtonsProps = {
  value: number;
  onChange: (level: number) => void;
};

export function QuickStressLevelSelectButtons({
  value,
  onChange,
}: QuickStressLevelSelectButtonsProps) {
  return (
    <div className="grid grid-cols-5 gap-2 pt-2 auto-rows-max">
      {[
        {
          level: 0,
          label: "Zen",
          description: "Absolute calm",
          icon: Sun,
        },
        {
          level: 25,
          label: "Excited",
          description: "Mind is busy",
          icon: CloudSun,
        },
        {
          level: 50,
          label: "Agitated",
          description: "Critical point",
          icon: CloudSunRain,
        },
        {
          level: 75,
          label: "On the edge",
          description: "Losing control",
          icon: CloudRainWind,
        },
        {
          level: 100,
          label: "Thrown off",
          description: "Loss of control",
          icon: CloudLightning,
        },
      ].map(({ level, label, description, icon: IconComponent }) => {
        return (
          <QuickStressLevelSelectButton
            level={level}
            label={label}
            description={description}
            IconComponent={IconComponent}
            selected={value === level}
            onClick={onChange}
          />
        );
      })}
    </div>
  );
}
