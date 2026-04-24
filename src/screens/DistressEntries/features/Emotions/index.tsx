import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import nuancedAngerEmotions from "@/data/nuancedEmotions/anger.json";
import React from "react";

export function Emotions() {
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  return (
    <>
      <BackButton backUrl="/distress-entry" />
      <div>Emotions</div>

      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(40rem, 100%), 1fr))",
        }}
      >
        {nuancedAngerEmotions.map((emotion) => {
          const { id } = emotion;
          const selected = selectedEmotions.includes(id);
          return (
            <EmotionCard
              key={id}
              {...emotion}
              selected={selectedEmotions.includes(id)}
              onSelect={(emotionId) => {
                if (selected) {
                  setSelectedEmotions((prev) =>
                    prev.filter((prevId) => prevId !== emotionId),
                  );
                  return;
                }
                setSelectedEmotions((prev) =>
                  Array.from(new Set([...prev, emotionId])),
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
}
