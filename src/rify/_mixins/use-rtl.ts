import { rtlEnabledState, RtlEnabledStae } from '../provider';
import { cssrAnchorMetaName } from './common';

export const useRtl = (mountId: keyof RtlEnabledStae, rtlState: RtlEnabledStae | 'ltr' | 'rtl' | undefined, clsPrefix: string) => {
  if (!rtlState || rtlState === 'ltr') return undefined;
  const rtlStyle = rtlState === 'rtl' ? rtlEnabledState[mountId] : rtlState[mountId];
  if (!rtlStyle) return undefined;
  rtlStyle.style.mount({
    id: `${clsPrefix}${mountId}Rtl`,
    head: true,
    anchorMetaName: cssrAnchorMetaName,
    props: {
      bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
    },
  });
  return rtlStyle;
};
