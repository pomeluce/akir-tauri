import { c, cB, cE, cM } from '../../../_utils';

const placementTopLR = cB('tooltip-arrow', { bottom: 0, transform: 'translateY(100%) rotate(180deg)' });
const placementBottomLR = cB('tooltip-arrow', { top: 0, transform: 'translateY(-100%)' });
const placementLeftTB = cB('tooltip-arrow', { right: 0, transform: 'translateX(100%) rotate(90deg)' });
const placementRightTB = cB('tooltip-arrow', { left: 0, transform: 'translateX(-100%) rotate(-90deg)' });

// --rify-arrow-offset-horizontal
// --rify-arrow-offset-vertical
// --rify-arrow-clip-path
// --rify-arrow-shadow-width
// --rify-background-color
// --rify-box-shadow
// --rify-bezier
// --rify-border-radius
// --rify-height
// --rify-font-size
// --rify-line-height
// --rify-padding-sm
// --rify-padding-xs
// --rify-text-color
// --rify-title-font-size
// --rify-title-font-weight
// --rify-title-text-color
// --rify-z-index-popup
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
    zIndex: 'var(--rify-z-index-popup)',
    display: 'block',
    width: 'max-content',
    maxWidth: '250px',
    visibility: 'visible',
    transformOrigin: 'var(--arrow-x,50%) var(--arrow-y,50%)',
    transition: ' color .3s var(--rify-bezier)',
  },
  [
    cM('hidden', { display: 'none' }),
    cM('placement-top', {}, [placementTopLR, cB('tooltip-arrow', { left: '50%', transform: 'translateX(-50%) translateY(100%) rotate(180deg)' })]),
    cM('placement-topLeft', {}, [placementTopLR, cB('tooltip-arrow', { left: 'var(--rify-arrow-offset-horizontal)' })]),
    cM('placement-topRight', {}, [placementTopLR, cB('tooltip-arrow', { right: 'var(--rify-arrow-offset-horizontal)' })]),
    cM('placement-bottom', {}, [placementBottomLR, cB('tooltip-arrow', { left: '50%', transform: 'translateX(-50%) translateY(-100%)' })]),
    cM('placement-bottomLeft', {}, [placementBottomLR, cB('tooltip-arrow', { left: 'var(--rify-arrow-offset-horizontal)' })]),
    cM('placement-bottomRight', {}, [placementBottomLR, cB('tooltip-arrow', { right: 'var(--rify-arrow-offset-horizontal)' })]),
    cM('placement-left', {}, [placementLeftTB, cB('tooltip-arrow', { top: '50%', transform: 'translateY(-50%) translateX(100%) rotate(90deg)' })]),
    cM('placement-leftTop', {}, [placementLeftTB, cB('tooltip-arrow', { top: 'var(--rify-arrow-offset-vertical)' })]),
    cM('placement-leftBottom', {}, [placementLeftTB, cB('tooltip-arrow', { bottom: 'var(--rify-arrow-offset-vertical)' })]),
    cM('placement-right', {}, [placementRightTB, cB('tooltip-arrow', { top: '50%', transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)' })]),
    cM('placement-rightTop', {}, [placementRightTB, cB('tooltip-arrow', { top: 'var(--rify-arrow-offset-vertical)' })]),
    cM('placement-rightBottom', {}, [placementRightTB, cB('tooltip-arrow', { bottom: 'var(--rify-arrow-offset-vertical)' })]),
    cB(
      'tooltip-arrow',
      {
        position: 'absolute',
        zIndex: 1,
        display: 'block',
        pointerEvents: 'none',
        width: 'var(--rify-size-popup-arrow)',
        height: 'var(--rify-size-popup-arrow)',
        overflow: 'hidden',
      },
      [
        c('&::before', {
          content: '""',
          position: 'absolute',
          bottom: 0,
          insetInlineStart: 0,
          width: 'var(--rify-size-popup-arrow)',
          height: 'calc(var(--rify-size-popup-arrow) / 2)',
          background: 'var(--rify-background-color)',
          clipPath: 'var(--rify-arrow-clip-path)',
        }),
        c('&:after', {
          content: '""',
          position: 'absolute',
          width: 'var(--rify-arrow-shadow-width)',
          height: 'var(--rify-arrow-shadow-width)',
          bottom: 0,
          insetInline: 0,
          margin: 'auto',
          borderRadius: '0 0 var(--rify-border-radius) 0',
          transform: 'translateY(50%) rotate(-135deg)',
          boxShadow: 'var(--rify-box-shadow)',
          zIndex: 0,
          background: '0 0',
        }),
      ],
    ),
    cB('tooltip-content', { position: 'relative' }, [
      cB('tooltip-inner', {
        minWidth: 'var(--rify-height)',
        minHeight: 'var(--rify-height)',
        padding: 'calc(var(--rify-padding-sm)/2) var(--rify-padding-xs)',
        color: 'var(--rify-text-color)',
        textAlign: 'start',
        textDecoration: 'none',
        wordWrap: 'break-word',
        backgroundColor: 'var(--rify-background-color)',
        borderRadius: 'var(--rify-border-radius)',
        boxShadow: 'var(--rify-box-shadow)',
        boxSizing: 'border-box',
      }),
    ]),
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
