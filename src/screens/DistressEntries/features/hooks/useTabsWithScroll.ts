import * as React from "react";

export function useTabsWithScroll(availableTabsKeys: string[]) {
  const [activeTabState, setActiveTabState] = React.useState<string>("");
  const activeTab = availableTabsKeys.includes(activeTabState)
    ? activeTabState
    : availableTabsKeys[0];
  const groupRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const tabClickedRef = React.useRef(false);

  const handleTabChange = (tabValue: string) => {
    tabClickedRef.current = true;
    setActiveTabState(tabValue);
  };

  const handleUserScroll = () => {
    tabClickedRef.current = false;
  };

  const handleScroll = () => {
    if (!listRef.current) return;
    if (tabClickedRef.current) return;

    const scrollContainer = listRef.current;
    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;

    let visibleGroup: string | undefined;
    let maxVisibility = 0;

    Object.entries(groupRefs.current).forEach(([groupId, element]) => {
      if (!element) return;

      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;

      const visibleTop = Math.max(elementTop, scrollTop);
      const visibleBottom = Math.min(
        elementBottom,
        scrollTop + containerHeight,
      );
      const visibility = Math.max(0, visibleBottom - visibleTop);

      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        visibleGroup = groupId;
      }
    });

    if (visibleGroup) {
      setActiveTabState(visibleGroup);
    }
  };
  return {
    activeTab,
    groupRefs,
    listRef,
    handleTabChange,
    handleUserScroll,
    handleScroll,
  }
}