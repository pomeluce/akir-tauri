import { CNode } from 'css-render';
import { cssrAnchorMetaName } from './common';
import { ProviderContext } from '../provider/context';
import { GlobalTheme } from '../provider/interface';
import { ThemeCommonVars, commonDark, commonLight } from '../_styles/common';
import { defaults, merge } from 'lodash-es';

export interface Theme<N, T = Record<string, unknown>, R = any> {
  name: N;
  common?: ThemeCommonVars;
  peers?: R;
  self?: (vars: ThemeCommonVars) => T;
}

export interface ThemeProps<T> {
  theme: T;
  themeOverrides: ExtractThemeOverrides<T>;
}

export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown> ? (unknown extends U ? Record<string, unknown> : U) : Record<string, unknown>;

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> & { common?: Partial<ThemeCommonVars> };

const useTheme = <N, T, R>(
  resolveId: Exclude<keyof GlobalTheme, 'common' | 'name'>,
  mountId: string,
  style: CNode | undefined,
  defaultTheme: Theme<N, T, R>,
  clsPrefix: string | undefined,
) => {
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

  const {
    theme: { name },
    themeOverrides: { common } = {} as ExtractThemeOverrides<Theme<N, T, R>>,
  } = useContext(ProviderContext);

  // const {common: rcommon} = [resolveId] = {}

  return {
    common: merge(name === 'light' ? commonLight : commonLight, defaultTheme.common, common),
  };
};

export default useTheme;
