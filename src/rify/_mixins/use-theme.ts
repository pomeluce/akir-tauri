import { CNode } from 'css-render';
import { cssrAnchorMetaName } from './common';
import { ProviderContext } from '../provider/context';
import { GlobalTheme } from '../provider/interface';
import { ThemeCommonVars, commonDark, commonLight } from '../_styles/common';
import { merge } from 'lodash-es';

export interface Theme<N, T = Record<string, unknown>, R = any> {
  name: N;
  common?: ThemeCommonVars;
  peers?: R;
  self?: (vars: ThemeCommonVars) => T;
}

const useTheme = (mountId: string, style: CNode | undefined, defaultTheme: Theme<N, T, R>, clsPrefix: string | undefined) => {
  if (style) {
    style.mount({
      id: clsPrefix ? `${clsPrefix}${mountId}` : mountId,
      head: true,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
      },
      anchorMetaName: cssrAnchorMetaName,
    });
  }

  const { theme, themeOverrides } = useContext(ProviderContext);

  return {
    theme: {
      name: theme.name ?? 'light',
      common: merge(theme.name === 'light' ? commonLight : commonDark, theme.common),
    } as GlobalTheme,
    themeOverrides: themeOverrides,
  };
};

export default useTheme;
