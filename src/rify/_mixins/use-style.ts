import { CNode } from 'css-render';
import { throwError } from '../_utils';
import { cssrAnchorMetaName } from './common';

const useStyle = (mountId: string, style: CNode, clsPrefix: string): void => {
  if (!style) {
    if (import.meta.env.MODE === 'dev') throwError('use-style', 'No style is specified.');
    return;
  }
  style.mount({
    id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
    head: true,
    anchorMetaName: cssrAnchorMetaName,
    props: {
      bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
    },
  });
};
export default useStyle;
