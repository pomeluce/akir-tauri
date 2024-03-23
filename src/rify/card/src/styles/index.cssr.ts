import { asModal, c, cB, cE, cM, insideModal, insidePopover } from '../../../_utils';

// vars:
// --rify-bezier
// --rify-border-radius
// --rify-color
// --rify-color-modal
// --rify-color-popover
// --rify-text-color
// --rify-line-height
// --rify-padding-top
// --rify-padding-bottom
// --rify-padding-left
// --rify-font-size
// --rify-action-color
// --rify-title-font-weight
// --rify-title-font-size
// --rify-title-text-color
// --rify-close-size
// --rify-close-icon-size
// --rify-close-color-hover
// --rify-close-color-pressed
// --rify-close-icon-color
// --rify-close-icon-color-hover
// --rify-close-icon-color-pressed
// --rify-border-color
// --rify-box-shadow
// --rify-color-embedded
// --rify-color-embedded-modal
// --rify-color-embedded-popover

export default c([
  cB(
    'card',
    {
      fontSize: 'var(--rify-font-size)',
      lineHeight: 'var(--rify-line-height)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: 'var(--rify-border-radius)',
      backgroundColor: 'var(--rify-color)',
      color: 'var(--rify-text-color)',
      wordBreak: 'break-word',
      transition: `color .3s var(--rify-bezier), background-color .3s var(--rify-bezier), box-shadow .3s var(--rify-bezier), border-color .3s var(--rify-bezier)`,
    },
    [
      asModal({ background: 'var(--rify-color-modal)' }),
      cM('hoverable', [c('&:hover', 'box-shadow: var(--rify-box-shadow);')]),
      cM('content-segmented', [c('>', [cE('content', { paddingTop: 'var(--rify-padding-bottom)' })])]),
      cM('content-soft-segmented', [c('>', [cE('content', { margin: '0 var(--rify-padding-left)', padding: 'var(--rify-padding-bottom) 0' })])]),
      cM('footer-segmented', [c('>', [cE('footer', { paddingTop: 'var(--rify-padding-bottom)' })])]),
      cM('footer-soft-segmented', [c('>', [cE('footer', { padding: 'var(--rify-padding-bottom) 0', margin: '0 var(--rify-padding-left)' })])]),
      c('>', [
        cB(
          'card-header',
          {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'var(--rify-title-font-size)',
            position: 'relative',
            padding: `var(--rify-padding-top) var(--rify-padding-left) var(--rify-padding-bottom) var(--rify-padding-left)`,
          },
          [
            c(`&::after`, {
              content: '""',
              position: 'absolute',
              width: `max(calc(100% - 20px), 95%)`,
              height: '1px',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--rify-border-color)',
              borderRadius: 'var(--rify-border-radius)',
            }),
            cE('main', {
              fontWeight: 'var(--rify-title-font-weight)',
              transition: 'color .3s var(--rify-bezier)',
              flex: 1,
              minWidth: 0,
              color: 'var(--rify-title-text-color)',
            }),
            cE('extra', {
              display: 'flex',
              alignItems: 'center',
              fontSize: 'var(--rify-font-size)',
              fontWeight: 400,
              transition: 'color .3s var(--rify-bezier)',
              color: 'var(--rify-text-color)',
            }),
            cE('close', {
              margin: '0 0 0 8px',
              transition: `background-color .3s var(--rify-bezier), color .3s var(--rify-bezier)`,
            }),
          ],
        ),
        cE('action', {
          boxSizing: 'border-box',
          transition: `background-color .3s var(--rify-bezier), border-color .3s var(--rify-bezier); background-clip: padding-box; background-color: var(--rify-action-color)`,
        }),
        cE('content', { flex: '1', minWidth: 0 }),
        cE(
          'content, footer',
          {
            boxSizing: 'border-box',
            padding: 'var(--rify-padding-top) var(--rify-padding-left) var(--rify-padding-bottom) var(--rify-padding-left)',
            fontSize: 'var(--rify-font-size)',
          },
          [c('&:first-child', { paddingTop: 'var(--rify-padding-bottom)' })],
        ),
        cE(
          'footer',
          {
            position: 'relative',
          },
          [
            c(`&::after`, {
              content: '""',
              position: 'absolute',
              width: `max(calc(100% - 20px), 95%)`,
              height: '1px',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--rify-border-color)',
              borderRadius: 'var(--rify-border-radius)',
            }),
          ],
        ),
        cE('action', {
          backgroundColor: 'var(--rify-action-color)',
          padding: 'var(--rify-padding-bottom) var(--rify-padding-left)',
          borderBottomLeftRadius: 'var(--rify-border-radius)',
          borderBottomRightRadius: 'var(--rify-border-radius)',
        }),
      ]),
      cB(
        'card-cover',
        {
          overflow: 'hidden',
          width: '100%',
          borderRadius: 'var(--rify-border-radius) var(--rify-border-radius) 0 0',
        },
        [c('img', { display: 'block', width: '100%' })],
      ),
      cM('bordered', { border: '1px solid var(--rify-border-color)' }, [c('&:target', 'border-color: var(--rify-color-target);')]),
      cM('action-segmented', [c('>', [cE('action', [c('&:not(:first-child)', { borderTop: '1px solid var(--rify-border-color)' })])])]),
      cM('content-segmented, content-soft-segmented', [
        c('>', [cE('content', { transition: 'border-color 0.3s var(--rify-bezier)' }, [c('&:not(:first-child)', { borderTop: '1px solid var(--rify-border-color)' })])]),
      ]),
      cM('footer-segmented, footer-soft-segmented', [
        c('>', [cE('footer', { transition: 'border-color 0.3s var(--rify-bezier)' }, [c('&:not(:first-child)', { borderTop: '1px solid var(--rify-border-color)' })])]),
      ]),
      cM('embedded', { backgroundColor: 'var(--rify-color-embedded)' }),
    ],
  ),
  insideModal(cB('card', { background: 'var(--rify-color-modal)' }, [cM('embedded', { backgroundColor: 'var(--rify-color-embedded-modal)' })])),
  insidePopover(cB('card', { background: 'var(--rify-color-popover)' }, [cM('embedded', { backgroundColor: 'var(--rify-color-embedded-popover)' })])),
]);
