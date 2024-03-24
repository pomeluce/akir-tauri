import { composite } from 'seemly';

export const createHoverColor = (rgb: string): string => {
  return composite(rgb, [255, 255, 255, 0.16]);
};

export const createPressedColor = (rgb: string): string => {
  return composite(rgb, [0, 0, 0, 0.12]);
};
