import { c, cB, cNotB } from '../../../_utils';

const placementTopLR = cB('tooltip-arrow', { bottom: 0, transform: 'translateY(100%) rotate(180deg)' });
const placementBottomLR = cB('tooltip-arrow', { top: 0, transform: 'translateY(-100%)' });
const placementLeftTB = cB('tooltip-arrow', { right: 0, transform: 'translateX(100%) rotate(90deg)' });
const placementRightTB = cB('tooltip-arrow', { left: 0, transform: 'translateX(-100%) rotate(-90deg)' });

// --rify-arrow-offset-horizontal
// --rify-arrow-offset-vertical
// --rify-arrow-clip-path
// --rify-arrow-shadow-width
// --rify-background-color
// --rify-bezier
// --rify-box-shadow
// --rify-bezier
// --rify-border-radius
// --rify-height
// --rify-font-size
// --rify-line-height
// --rify-padding-sm
// --rify-padding-xs
// --rify-text-color
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
    transition: 'color .3s var(--rify-bezier)',
  },
  [
    cNotB('tooltip-hidden', { display: 'none' }),
    cNotB('tooltip-placement-top', [placementTopLR, cB('tooltip-arrow', { left: '50%', transform: 'translateX(-50%) translateY(100%) rotate(180deg)' })]),
    cNotB('tooltip-placement-topLeft', [placementTopLR, cB('tooltip-arrow', { left: 'var(--rify-arrow-offset-horizontal)' })]),
    cNotB('tooltip-placement-topRight', [placementTopLR, cB('tooltip-arrow', { right: 'var(--rify-arrow-offset-horizontal)' })]),
    cNotB('tooltip-placement-bottom', [placementBottomLR, cB('tooltip-arrow', { left: '50%', transform: 'translateX(-50%) translateY(-100%)' })]),
    cNotB('tooltip-placement-bottomLeft', [placementBottomLR, cB('tooltip-arrow', { left: 'var(--rify-arrow-offset-horizontal)' })]),
    cNotB('tooltip-placement-bottomRight', [placementBottomLR, cB('tooltip-arrow', { right: 'var(--rify-arrow-offset-horizontal)' })]),
    cNotB('tooltip-placement-left', [placementLeftTB, cB('tooltip-arrow', { top: '50%', transform: 'translateY(-50%) translateX(100%) rotate(90deg)' })]),
    cNotB('tooltip-placement-leftTop', [placementLeftTB, cB('tooltip-arrow', { top: 'var(--rify-arrow-offset-vertical)' })]),
    cNotB('tooltip-placement-leftBottom', [placementLeftTB, cB('tooltip-arrow', { bottom: 'var(--rify-arrow-offset-vertical)' })]),
    cNotB('tooltip-placement-right', [placementRightTB, cB('tooltip-arrow', { top: '50%', transform: 'translateY(-50%) translateX(-100%) rotate(-90deg)' })]),
    cNotB('tooltip-placement-rightTop', [placementRightTB, cB('tooltip-arrow', { top: 'var(--rify-arrow-offset-vertical)' })]),
    cNotB('tooltip-placement-rightBottom', [placementRightTB, cB('tooltip-arrow', { bottom: 'var(--rify-arrow-offset-vertical)' })]),
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
  ],
);
