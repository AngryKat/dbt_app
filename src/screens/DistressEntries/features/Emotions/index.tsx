import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import nuancedEmotions from "@/data/nuancedEmotions";
import { SearchInput } from "@/components/ui/SearchInput";
import { NoEmotionsFound } from "./components/NoEmotionsFound";

export function Emotions() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  const [h2HeaderText, setH2HeaderText] = React.useState("");
  const h2AboveViewport = !!h2HeaderText;
  const headerRef = React.useRef<HTMLElement>(null);
  const filteredEmotions = Object.entries(
    Object.fromEntries(
      Object.entries(nuancedEmotions).map(([emotion, nuancedEmotions]) => [
        emotion,
        nuancedEmotions.filter(({ label }) =>
          label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      ]),
    ),
  );

  const haveEmotions = filteredEmotions.some(
    ([_, emotions]) => emotions.length > 0,
  );

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
        className="flex items-center sticky top-0 left-0 right-0 border-b border-border p-4 z-10  mt-[-14px] bg-background"
      >
        <div className="mr-auto flex items-center gap-4">
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
        </div>
        <div>
          <SearchInput
            placeholder="Search emotion"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-y-auto px-[14px] py-6">
        {!haveEmotions ? (
          <NoEmotionsFound searchTerm={searchTerm} />
        ) : (
          filteredEmotions.map(([emotion, nuancedEmotions]) => {
            if (!nuancedEmotions.length) return null;
            return (
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
            );
          })
        )}
      </main>
    </div>
  );
}
