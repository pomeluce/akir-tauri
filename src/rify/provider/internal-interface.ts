import { CNode } from 'css-render';
import type { ButtonTheme } from '../button/styles';
import { CardTheme } from '../card/styles';

export interface GlobalThemeWithoutCommon {
  Button?: ButtonTheme;
  Card?: CardTheme;
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon;
  style: CNode;
}

export type RtlEnabledStae = Partial<Record<keyof GlobalThemeWithoutCommon, RtlItem>>;
