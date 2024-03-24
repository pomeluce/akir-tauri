import { cB, cM, cE, c } from '../../../_utils';

export default cB('button', [
  cM('rtl', { direction: 'rtl' }, [
    cE('icon', {
      margin: 'var(--rify-icon-margin)',
      marginRight: 0,
    }),
    cE('content', [
      c('~', [
        cE('icon', {
          margin: 'var(--rify-icon-margin)',
          marginLeft: 0,
        }),
      ]),
    ]),
  ]),
]);
