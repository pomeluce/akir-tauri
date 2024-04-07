import { cB, cE, cM } from '../../../_utils';

export default cB(
  'tooltip',
  {
    margin: 0,
    padding: 0,

    color: 'var(--rify-text-color)',
    lineHeight: 'var(--rify-line-height)',
    fontSize: 'var(--rify-font-size)',
    listStyle: 'none',
    position: 'absolute',
    zIndex: 'var(--rify-tooltip-z-index-popup)',
    display: 'block',
    width: 'max-content',
    maxWidth: '250px',
    visibility: 'visible',
    transformOrigin: 'var(--arrow-x,50%) var(--arrow-y,50%)',
    // --antd-arrow-background-color: var(--ant-color-bg-spotlight);
    transition: ' color .3s var(--rify-bezier)',
  },
  [
    cM('hidden', { display: 'none' }),
    cB('tooltip-content', { marginTop: '24px' }),
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
