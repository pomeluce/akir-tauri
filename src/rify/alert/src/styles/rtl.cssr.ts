import { cB, cE, cM } from '../../../_utils';

export default cB('alert', [
  cM('rtl', { direction: 'rtl' }, [
    cM('closable', [cB('alert-body', [cE('title', { paddingLeft: '24px', paddingRight: 'unset' })])]),
    cE('icon', { left: 'unset', right: 0, margin: 'var(--rify-icon-margin-rtl)' }),
    cM('show-icon', [
      cB('alert-body', {
        paddingLeft: 'var(--rify-padding)',
        paddingRight: `calc(var(--rify-icon-margin-left) + var(--rify-icon-size) + var(--rify-icon-margin-right))`,
      }),
    ]),
    cE('close', { position: 'absolute', right: 'unset', left: 0, margin: 'var(--rify-close-margin-rtl)' }),
  ]),
]);
