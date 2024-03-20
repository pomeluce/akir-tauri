import { CNode } from 'css-render';
import { cssrAnchorMetaName } from './common';
import { globalTheme, ProviderContext } from '../provider';
import { GlobalTheme, GlobalThemeOverrides } from '../provider/interface';
import { ThemeCommonVars } from '../_styles/common';
import { merge } from 'lodash-es';

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

  const { theme: { name } = {} as GlobalTheme, themeOverrides: { common: contextCommonOverrides, [resolveId]: contextSelfOverrides = {} } = {} as GlobalThemeOverrides } =
    useContext(ProviderContext);

  const { common: globalCommon, [resolveId]: { common: globalSelfCommon = undefined, self: globalSelf = undefined } = {} } = globalTheme(name);

  const { common: contextSelfCommonOverrides, ...contextSelf } = contextSelfOverrides;

  console.log(contextSelfOverrides);

  const mergedCommon = merge({}, globalCommon || globalSelfCommon || defaultTheme.common, contextCommonOverrides, contextSelfCommonOverrides);

  return {
    common: mergedCommon,
    self: merge({}, (globalSelf || defaultTheme.self)?.(mergedCommon) as T, contextSelf),
  };
};

export default useTheme;
