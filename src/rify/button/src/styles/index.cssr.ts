import { c, cB, cE, cM } from '@/rify/_utils/cssr';

// vars:
// --rify-bezier
// --rify-bezier-ease-out
// --rify-ripple-duration
// --rify-opacity-disabled
// --rify-text-color
// --rify-text-color-hover
// --rify-text-color-pressed
// --rify-text-color-focus
// --rify-text-color-disabled
// --rify-color
// --rify-color-hover
// --rify-color-pressed
// --rify-color-focus
// --rify-color-disabled
// --rify-border
// --rify-border-hover
// --rify-border-pressed
// --rify-border-focus
// --rify-border-disabled
// --rify-ripple-color
// --rify-border-radius
// --rify-height
// --rify-width
// --rify-font-size
// --rify-padding
// --rify-icon-size
// --rify-icon-margin
// --rify-wave-opacity
// --rify-font-weight
//
// private-vars:
// --rify-border-color-xxx, used for custom color

export default c([
  cB(
    'button',
    {
      margin: 0,
      fontWeight: 'var(--rify-font-weight)',
      lineHeight: 1,
      fontFamily: 'inherit',
      padding: 'var(--rify-padding)',
      height: 'var(--rify-height)',
      fontSize: 'var(--rify-font-size)',
      borderRadius: 'var(--rify-border-radius)',
      color: 'var(--rify-text-color)',
      backgroundColor: 'var(--rify-color)',
      width: 'var(--rify-width)',
      whiteSpace: 'nowrap',
      outline: 'none',
      position: 'relative',
      zIndex: 'auto',
      border: 'none',
      display: 'inline-flex',
      flexWrap: 'nowrap',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color .3s var(--rify-bezier), background-color .3s var(--rify-bezier), opacity .3s var(--rify-bezier), border-color .3s var(--rify-bezier)',
    },
    [
      cM('color', [
        cE('border', {
          borderColor: 'var(--rify-border-color)',
        }),
      ]),
    ],
  ),
]);
