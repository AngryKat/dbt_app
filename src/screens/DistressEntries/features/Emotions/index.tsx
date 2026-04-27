import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import { SelectedEmotions } from "./components/SelectedEmotions";
import nuancedEmotions from "@/data/nuancedEmotions";
import { SearchInput } from "@/components/ui/SearchInput";
import { emotionColors } from "./constants/emotion-color-map";

export function Emotions() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedEmotions, setSelectedEmotions] = React.useState<string[]>([]);
  const [h2HeaderText, setH2HeaderText] = React.useState("");
  const h2AboveViewport = !!h2HeaderText;

  const headerRef = React.useRef<HTMLElement>(null);
  const allEmotions = Object.entries(nuancedEmotions);

  React.useEffect(() => {
    if (!searchTerm) return;
    const timer = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const allCards = document.querySelectorAll<HTMLElement>(
        "[data-emotion-label]",
      );
      for (const card of allCards) {
        if (card.dataset.emotionLabel?.toLowerCase().includes(term)) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

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
        className="@container/header flex items-center gap-4 sticky top-0 left-0 right-0 border-b border-border p-4 z-10 mt-[-14px] bg-background"
      >
        <BackButton backUrl="/distress-entry" />
        <div className="mr-auto grow @container">
          <div className="flex gap-2 items-center @max-[200px]:hidden">
            <h1 className="font-heading text-xl min-w-[fit-content]">
              Pick your emotions
            </h1>
            {h2AboveViewport && (
              <h2
                className="capitalize font-heading text-xl text-gray-500"
                aria-hidden="true"
              >
                {h2HeaderText}
              </h2>
            )}
          </div>
        </div>
        <div>
          <SearchInput
            classNames={{
              inputGroup:
                "overflow-hidden @min-md/header:w-[200px] w-0 focus-within:w-[200px]  transition-width duration-400 ease-out",
            }}
            id="search-emotions-input"
            placeholder="Search emotion"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-y-auto px-[14px] py-6 relative">
        <SelectedEmotions
          selectedEmotions={selectedEmotions}
          onRemoveEmotion={(emotionId) => {
            setSelectedEmotions((prev) =>
              prev.filter((prevId) => prevId !== emotionId),
            );
          }}
          onClearAll={() => setSelectedEmotions([])}
        />
        {allEmotions.map(([baseEmotion, nuancedEmotions]) => (
          <React.Fragment key={baseEmotion}>
            <h2
              data-emotion-heading="true"
              className="text-4xl capitalize py-6 font-heading font-black text-foreground tracking-tight"
            >
              {baseEmotion}
            </h2>

            <div className="grid gap-5 px-2">
              {nuancedEmotions.map((nuancedEmotion) => {
                const { id, label } = nuancedEmotion;
                const selected = selectedEmotions.includes(id);
                const borderColor =
                  emotionColors[baseEmotion as keyof typeof emotionColors];
                return (
                  <div key={id} data-emotion-label={label}>
                    <EmotionCard
                      {...nuancedEmotion}
                      borderColor={borderColor}
                      selected={selected}
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
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </main>
    </div>
  );
}
