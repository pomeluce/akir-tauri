import { CNode } from 'css-render';
import type { ButtonTheme } from '../button/styles';
import type { AlertTheme } from '../alert/styles';
import type { CardTheme } from '../card/styles';
import type { MenuTheme } from '../menu/styles';
import type { ResultTheme } from '../result/styles';
import type { TooltipTheme } from '../tooltip/styles';

export interface GlobalThemeWithoutCommon {
  Alert?: AlertTheme;
  Button?: ButtonTheme;
  Card?: CardTheme;
  Menu?: MenuTheme;
  Result?: ResultTheme;
  Tooltip?: TooltipTheme;
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon;
  style: CNode;
}

export type RtlEnabledStae = Partial<Record<keyof GlobalThemeWithoutCommon, RtlItem>>;
