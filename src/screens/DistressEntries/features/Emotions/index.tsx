import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import nuancedAngerEmotions from "@/data/nuancedEmotions/anger.json";
import React from "react";

export function Emotions() {
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton backUrl="/distress-entry" />
        <h1 className="font-heading text-xl">Pick your emotions</h1>
      </div>
      <div className="flex-1 flex flex-col gap-6 py-6">
        <h2 className="text-4xl font-heading font-black text-foreground tracking-tight">
          Anger
        </h2>

        <div
          className="grid gap-5 px-2"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(25rem, 100%), 1fr))",
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
      </div>
    </>
  );
}
