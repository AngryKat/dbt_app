import type { MouseEvent } from "react";
import { useCallback } from "react";

/**
 * Hook for handling click events with smart delegation.
 * Prevents triggering on interactive elements or when text is selected.
 * 
 * @param callback - Function to call when card is clicked (not on interactive elements)
 * @returns Click handler function
 * 
 * @example
 * const selectButtonRef = useRef<HTMLButtonElement>(null);
 * const handleClick = useClickDelegation(() => {
 *   selectButtonRef.current?.click();
 * });
 */
export function useClickDelegation(callback: () => void) {
  return useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      // Don't trigger if clicking on interactive elements
      if (target.closest("a, button, input, textarea, select, summary")) {
        return;
      }

      // Don't trigger if selecting text
      const selectedText = window.getSelection()?.toString();
      if (selectedText) {
        return;
      }

      callback();
    },
    [callback],
  );
}
