import type { ButtonTheme } from '../button/styles';
import { CardTheme } from '../card/styles';

export interface GlobalThemeWithoutCommon {
  Button?: ButtonTheme;
  Card?: CardTheme;
}
