import { QuickStressLevelSelectButton } from "./components/QuickStressLevelSelectButton";
import {
  Sun,
  CloudSun,
  CloudSunRain,
  CloudRainWind,
  CloudLightning,
} from "lucide-react";

type StressLevel = {
  level: [number, number];
  label: string;
  description: string;
  icon: React.ComponentType;
  value: number;
  color: string;
};

const STRESS_LEVELS: StressLevel[] = [{
          level: [0, 19],
          label: "Baseline",
          description: "Mindful Calm",
          icon: Sun,
          value: 0,
          color: "#14b8a6",
        },
        {
          level: [20, 39],
          label: "Yellow Zone",
          description: "Active Coping",
          icon: CloudSun,
          value: 25,
          color: "#eab308",
        },
        {
          level: [40, 59],
          label: "The Tipping Point",
          description: "High Distress",
          icon: CloudSunRain,
          value: 50,
          color: "#f97316",
        },
        {
          level: [60, 79],
          label: "Crisis Zone",
          description: "Emotional Hijack",
          icon: CloudRainWind,
          value: 75,
          color: "#f87171",
        },
        {
          level: [80, 100],
          label: "Burnout",
          description: "Amygdala Overload",
          icon: CloudLightning,
          value: 100,
          color: "#b91c1c",
        },]

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
      {STRESS_LEVELS.map(
        (
          {
            level,
            label,
            description,
            icon: IconComponent,
            value: buttonValue,
            color,
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
              color={color}
              onClick={onChange}
            />
          );
        },
      )}
    </div>
  );
}
