import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import nuancedEmotions from "@/data/nuancedEmotions";
import React from "react";

export function Emotions() {
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  const [h2HeaderText, setH2HeaderText] = React.useState("");
  const h2AboveViewport = !!h2HeaderText;
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setH2HeaderText(entry.target.textContent || "");
          } else if (entry.isIntersecting) {
            const remaining = Array.from(
              document.querySelectorAll('[data-emotion-heading="true"]'),
            ).filter(
              (el) =>
                el.getBoundingClientRect().top + el.clientHeight < headerHeight,
            );
            console.log({ remaining });
            setH2HeaderText(remaining.at(-1)?.textContent || "");
          }
        });
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );

    document
      .querySelectorAll('[data-emotion-heading="true"]')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-screen flex flex-col overflow-hidden m-[-14px]">
      <header
        ref={headerRef}
        className="flex items-center gap-4 sticky top-0 left-0 right-0 border-b border-border p-4 z-10 mx-[-1rem] mt-[-1rem] bg-background"
      >
        <BackButton backUrl="/distress-entry" />
        <h1 className="font-heading text-xl">Pick your emotions</h1>
        {h2AboveViewport && (
          <h2
            className="capitalize font-heading text-xl text-gray-500"
            aria-hidden="true"
          >
            {h2HeaderText}
          </h2>
        )}
      </header>
      <main className="flex-1 flex flex-col overflow-y-auto pb-4 pt-6 px-[14px]">
        {Object.entries(nuancedEmotions).map(([emotion, nuancedEmotions]) => (
          <>
            <h2
              data-emotion-heading="true"
              className="text-4xl capitalize py-6 font-heading font-black text-foreground tracking-tight"
            >
              {emotion}
            </h2>

            <div
              className="grid gap-5 px-2"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(25rem, 100%), 1fr))",
                gridAutoRows: "auto auto auto auto auto",
              }}
            >
              {nuancedEmotions.map((emotion) => {
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
        ))}
      </main>
    </div>
  );
}
