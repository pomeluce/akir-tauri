import { c, cB, cE, cM } from '../../../_utils';
import { fadeInHeightExpandTransition } from '../../../_styles';

// vars:
// --rify-bezier
// --rify-color
// --rify-close-color-hover
// --rify-close-color-pressed
// --rify-close-icon-color
// --rify-close-icon-color-hover
// --rify-close-icon-color-pressed
// --rify-icon-color
// --rify-border
// --rify-title-text-color
// --rify-content-text-color
// --rify-line-height
// --rify-border-radius
// --rify-font-size
// --rify-title-font-weight
// --rify-icon-size
// --rify-icon-margin
// --rify-close-size
// --rify-close-icon-size
// --rify-close-margin
// --rify-padding
// --rify-icon-margin-left
// --rify-icon-margin-right
export default cB(
  'alert',
  {
    lineHeight: 'var(--rify-line-height)',
    borderRadius: 'var(--rify-border-radius)',
    position: 'relative',
    transition: 'background-color .3s var(--rify-bezier)',
    backgroundColor: 'var(--rify-color)',
    textAlign: 'start',
    wordBreak: 'break-word',
  },
  [
    cE('border', {
      borderRadius: 'inherit',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      transition: 'border-color .3s var(--rify-bezier)',
      border: 'var(--rify-border)',
      pointerEvents: 'none',
    }),
    cM('closable', [cB('alert-body', [cE('title', { paddingRight: '24px' })])]),
    cE('icon', { color: 'var(--rify-icon-color)' }),
    cB('alert-body', { padding: 'var(--rify-padding)' }, [cE('title', { color: 'var(--rify-title-text-color)' }), cE('content', { color: 'var(--rify-content-text-color)' })]),
    fadeInHeightExpandTransition({
      originalTransition: 'transform .3s var(--rify-bezier)',
      enterToProps: { transform: 'scale(1)' },
      leaveToProps: { transform: 'scale(0.9)' },
    }),
    cE('icon', {
      position: 'absolute',
      left: 0,
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      width: 'var(--rify-icon-size)',
      height: 'var(--rify-icon-size)',
      fontSize: 'var(--rify-icon-size)',
      margin: 'var(--rify-icon-margin)',
    }),
    cE('close', {
      transition: `color .3s var(--rify-bezier), background-color .3s var(--rify-bezier)`,
      position: 'absolute',
      right: 0,
      top: 0,
      margin: 'var(--rify-close-margin)',
    }),
    cM('show-icon', [cB('alert-body', { paddingLeft: 'calc(var(--rify-icon-margin-left) + var(--rify-icon-size) + var(--rify-icon-margin-right))' })]),
    // fix: https://github.com/tusen-ai/naive-ui/issues/4588
    cM('right-adjust', [cB('alert-body', { paddingRight: 'calc(var(--rify-close-size) + var(--rify-padding) + 2px)' })]),
    cB('alert-body', { borderRadius: 'var(--rify-border-radius)', transition: 'border-color .3s var(--rify-bezier)' }, [
      cE('title', { transition: 'color .3s var(--rify-bezier)', fontSize: '16px', lineHeight: '19px', fontWeight: 'var(--rify-title-font-weight)' }, [
        c('& +', [cE('content', { marginTop: '9px' })]),
      ]),
      cE('content', { transition: 'color .3s var(--rify-bezier)', fontSize: 'var(--rify-font-size)' }),
    ]),
    cE('icon', { transition: 'color .3s var(--rify-bezier)' }),
  ],
);
