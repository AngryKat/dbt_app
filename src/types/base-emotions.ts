export const BaseEmotionEnum = {
  anger: 'anger',
  disgust: 'disgust',
  envy: 'envy',
  fear: 'fear',
  happiness: 'happiness',
  jealousy: 'jealousy',
  love: 'love',
  sadness: 'sadness',
  shame: 'shame',
  guilt: 'guilt',
} as const;

export type BaseEmotionEnum = typeof BaseEmotionEnum[keyof typeof BaseEmotionEnum];

export type BaseEmotion = {
  id: string;
  key: BaseEmotionEnum;
  label: string | null;
  createdAt: string;
};

export type OptionsWithBaseEmotions<T> = Record<BaseEmotionEnum, {
  baseEmotionLabel: string;
  options: T[]
}>;