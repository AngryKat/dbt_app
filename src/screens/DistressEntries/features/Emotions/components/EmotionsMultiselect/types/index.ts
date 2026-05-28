import type { OptionsWithBaseEmotions } from "@/types/base-emotions";
import type { NuancedEmotion } from "../../../types";

export type EmotionsOptions = OptionsWithBaseEmotions<Pick<NuancedEmotion, "description" | "id" | "label">>;