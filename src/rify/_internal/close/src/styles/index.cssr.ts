import { cB, cM, c, cNotM } from '../../../../_utils';

// vars:
// --rify-close-border-radius
// --rify-close-color-hover
// --rify-close-color-pressed
// --rify-close-icon-color
// --rify-close-icon-color-hover
// --rify-close-icon-color-pressed
// --rify-close-icon-color-disabled
export default cB(
  'base-close',
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--rify-close-icon-color)',
    borderRadius: 'var(--rify-close-border-radius)',
    height: 'var(--rify-close-size)',
    width: 'var(--rify-close-size)',
    fontSize: 'var(--rify-close-icon-size)',
    outline: 'none',
    border: 'none',
    position: 'relative',
    padding: 0,
  },
  [
    cM('absolute', { height: 'var(--rify-close-icon-size)', width: 'var(--rify-close-icon-size)' }),
    c('&::before', {
      content: '',
      position: 'absolute',
      width: 'var(--rify-close-size)',
      height: 'var(--rify-close-size)',
      left: '50%',
      top: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
      transition: 'inherit',
      borderRadius: 'inherit',
    }),
    cNotM('disabled', [
      c('&:hover', `color: var(--rify-close-icon-color-hover);`),
      c('&:hover::before', `background-color: var(--rify-close-color-hover);`),
      c('&:focus::before', `background-color: var(--rify-close-color-hover);`),
      c('&:active', `color: var(--rify-close-icon-color-pressed);`),
      c('&:active::before', `background-color: var(--rify-close-color-pressed);`),
    ]),
    cM('disabled', {
      cursor: 'not-allowed',
      color: 'var(--rify-close-icon-color-disabled)',
      backgroundColor: 'transparent',
    }),
    cM('round', [c('&::before', `border-radius: 50%;`)]),
  ],
);
