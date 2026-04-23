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
          level: [0, 19] as [number, number],
          label: "Zen",
          description: "Calm",
          icon: Sun,
          value: 0,
        },
        {
          level: [20, 39] as [number, number],
          label: "Excited",
          description: "Mind is busy",
          icon: CloudSun,
          value: 25,
        },
        {
          level: [40, 59] as [number, number],
          label: "Tensed",
          description: "Critical point",
          icon: CloudSunRain,
          value: 50,
        },
        {
          level: [60, 79] as [number, number],
          label: "On the edge",
          description: "Losing control",
          icon: CloudRainWind,
          value: 75,
        },
        {
          level: [80, 100] as [number, number],
          label: "Thrown off",
          description: "Loss of control",
          icon: CloudLightning,
          value: 100,
        },
      ].map(
        (
          {
            level,
            label,
            description,
            icon: IconComponent,
            value: buttonValue,
          },
          index,
        ) => {
          const [minLevel, maxLevel] = level;
          const isSelected = value >= minLevel && value <= maxLevel;

          return (
            <QuickStressLevelSelectButton
              key={index}
              level={level}
              label={label}
              description={description}
              IconComponent={IconComponent}
              selected={isSelected}
              value={buttonValue}
              onClick={onChange}
            />
          );
        },
      )}
    </div>
  );
}
