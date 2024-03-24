import { cB, cE } from '../../../_utils';

// --rify-bezier
// --rify-font-size
// --rify-icon-size
// --rify-line-height
// --rify-text-color
// --rify-title-font-size
// --rify-title-font-weight
// --rify-title-text-color
export default cB(
  'result',
  {
    color: 'var(--rify-text-color)',
    lineHeight: 'var(--rify-line-height)',
    fontSize: 'var(--rify-font-size)',
    transition: ' color .3s var(--rify-bezier)',
  },
  [
    cB('result-icon', { display: 'flex', justifyContent: 'center', transition: 'color .3s var(--rify-bezier)' }, [cB('base-icon', { fontSize: 'var(--rify-icon-size)' })]),
    cB('result-content', { marginTop: '24px' }),
    cB('result-footer', { marginTop: '24px', textAlign: 'center' }),
    cB('result-header', [
      cE('title', {
        marginTop: '16px',
        fontWeight: 'var(--rify-title-font-weight)',
        transition: 'color .3s var(--rify-bezier)',
        textAlign: 'center',
        color: 'var(--rify-title-text-color)',
        fontSize: 'var(--rify-title-font-size)',
      }),
      cE('message', { marginTop: '4px', textAlign: 'center', fontSize: 'var(--rify-font-size)' }),
    ]),
  ],
);
