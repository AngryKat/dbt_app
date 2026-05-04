import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { EmotionCard } from "./components/EmotionCard";
import { SelectedEmotions } from "./components/SelectedEmotions";
import nuancedEmotions from "@/data/nuancedEmotions";
import type {
  BaseEmotion,
  Emotion,
  NuancedEmotion,
  SelectedEmotion,
} from "./types";
import { SearchEmotionInput } from "./components/SearchEmotionInput";
const allNuancedEmotions = Object.entries(nuancedEmotions);
const flatNuancedEmotions = allNuancedEmotions
  .map(([baseEmotion, nuancedEmotions]) =>
    nuancedEmotions.map((emotion) => ({
      ...emotion,
      baseEmotion,
    })),
  )
  .flat();
export function Emotions() {
  const [searchedEmotions, setSearchedEmotions] = React.useState<
    {
      baseEmotion: string;
      id: string;
      label: string;
      description: string;
      feelsLike: string;
      thinking: string;
      check: string;
    }[]
  >(flatNuancedEmotions);
  const [selectedEmotions, setSelectedEmotions] = React.useState<
    Record<Emotion, SelectedEmotion>
  >({} as Record<Emotion, SelectedEmotion>);
  const [h2HeaderText, setH2HeaderText] = React.useState("");
  const h2AboveViewport = !!h2HeaderText;

  const headerRef = React.useRef<HTMLElement>(null);

  const onSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setSearchedEmotions(flatNuancedEmotions);
      return;
    }
    const foundEmotions = flatNuancedEmotions.filter((emotion) =>
      emotion.label.toLowerCase().includes(searchTerm),
    );
    setSearchedEmotions(foundEmotions);
  };

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
        className="@container/header flex items-center gap-4 sticky top-0 left-0 right-0 p-4 z-10 mt-[-14px] bg-background"
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
          <SearchEmotionInput onSearch={onSearch} />
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-y-auto px-[14px]  relative">
        <SelectedEmotions
          selectedEmotions={Object.values(selectedEmotions)}
          onRemoveEmotion={(emotionId) => {
            setSelectedEmotions((prev) => {
              const copy = { ...prev };
              delete copy[emotionId];
              return copy;
            });
          }}
          onClearAll={() =>
            setSelectedEmotions({} as Record<Emotion, SelectedEmotion>)
          }
        />
        <div className="max-w-[90ch] mx-auto w-full py-6">
          <div
            className="grid gap-5 px-2"
            style={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(30ch, 100%), 1fr))",
              gridTemplateRows: "auto auto auto auto auto",
            }}
          >
            {searchedEmotions.map(({ id, baseEmotion, ...nuancedEmotion }) => {
              const selected = id in selectedEmotions;
              return (
                <EmotionCard
                  {...nuancedEmotion}
                  key={id}
                  id={id as NuancedEmotion}
                  selected={selected}
                  onSelect={(emotionId) => {
                    if (selected) {
                      const copy = { ...selectedEmotions };
                      delete copy[emotionId];
                      setSelectedEmotions(copy);
                      return;
                    }
                    setSelectedEmotions((prev) => ({
                      ...prev,
                      [emotionId]: {
                        emotion: emotionId,
                        baseEmotion: baseEmotion as BaseEmotion,
                      },
                    }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
