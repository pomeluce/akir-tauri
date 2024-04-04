import { c, cB, cM, cE, cNotM } from '../../../_utils';
import { fadeInScaleUpTransition } from '../../../_styles';

// vars:
// --rify-bezier
// --rify-font-size
// --rify-padding
// --rify-border-radius
// --rify-option-height
// --rify-option-prefix-width
// --rify-option-icon-prefix-width
// --rify-option-suffix-width
// --rify-option-icon-suffix-width
// --rify-color
// --rify-option-color-hover
// --rify-option-color-active
// --rify-divider-color
// --rify-option-text-color
// --rify-option-text-color-hover
// --rify-option-text-color-active
// --rify-option-text-color-child-active
// --rify-prefix-color
// --rify-suffix-color
// --rify-option-icon-size
// --rify-option-opacity-disabled

// shared with popover
// --rify-box-shadow

export default cB(
  'dropdown-menu',
  {
    transformOrigin: 'var(--v-transform-origin)',
    backgroundColor: 'var(--rify-color)',
    borderRadius: 'var(--rify-border-radius)',
    boxShadow: 'var(--rify-box-shadow)',
    position: 'relative',
    transition: 'background-color .3s var(--rify-bezier), box-shadow .3s var(--rify-bezier)',
  },
  [
    fadeInScaleUpTransition(),
    cB('dropdown-option', { position: 'relative' }, [
      c('a', { textDecoration: 'none', color: 'inherit', outline: 'none' }, [
        c('&::before', {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }),
      ]),
      cB(
        'dropdown-option-body',
        {
          display: 'flex',
          cursor: 'pointer',
          position: 'relative',
          height: 'var(--rify-option-height)',
          lineHeight: 'var(--rify-option-height)',
          fontSize: 'var(--rify-font-size)',
          color: 'var(--rify-option-text-color)',
          transition: 'color .3s var(--rify-bezier)',
        },
        [
          c('&::before', {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '4px',
            right: '4px',
            transition: 'background-color .3s var(--rify-bezier)',
            borderRadius: 'var(--rify-border-radius)',
          }),
          cNotM('disabled', [
            cM('pending', { color: 'var(--rify-option-text-color-hover)' }, [
              cE('prefix, suffix', { color: 'var(--rify-option-text-color-hover)' }),
              c('&::before', { backgroundColor: 'var(--rify-option-color-hover)' }),
            ]),
            cM('active', { color: 'var(--rify-option-text-color-active)' }, [
              cE('prefix, suffix', { color: 'var(--rify-option-text-color-active)' }),
              c('&::before', 'background-color: var(--rify-option-color-active);'),
            ]),
            cM('child-active', { color: 'var(--rify-option-text-color-child-active)' }, [cE('prefix, suffix', { color: 'var(--rify-option-text-color-child-active)' })]),
          ]),
          cM('disabled', {
            cursor: 'not-allowed',
            opacity: 'var(--rify-option-opacity-disabled)',
          }),
          cM(
            'group',
            {
              fontSize: 'calc(var(--rify-font-size) - 1px)',
              color: 'var(--rify-group-header-text-color)',
            },
            [cE('prefix', { width: 'calc(var(--rify-option-prefix-width) / 2)' }, [cM('show-icon', { width: 'calc(var(--rify-option-icon-prefix-width) / 2)' })])],
          ),
          cE(
            'prefix',
            {
              width: 'var(--rify-option-prefix-width)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'var(--rify-prefix-color)',
              transition: 'color .3s var(--rify-bezier)',
              zIndex: 1,
            },
            [cM('show-icon', { width: 'var(--rify-option-icon-prefix-width)' }), cB('icon', { fontSize: 'var(--rify-option-icon-size)' })],
          ),
          cE('label', { whiteSpace: 'nowrap', flex: 1, zIndex: 1 }),
          cE(
            'suffix',
            {
              boxSizing: 'border-box',
              flexGrow: 0,
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              minWidth: 'var(--rify-option-suffix-width)',
              padding: '0 8px',
              transition: 'color .3s var(--rify-bezier)',
              color: 'var(--rify-suffix-color)',
              zIndex: 1,
            },
            [cM('has-submenu', { width: 'var(--rify-option-icon-suffix-width)' }), cB('icon', { fontSize: 'var(--rify-option-icon-size)' })],
          ),
          cB('dropdown-menu', 'pointer-events: all;'),
        ],
      ),
      cB('dropdown-offset-container', { pointerEvents: 'none', position: 'absolute', left: 0, right: 0, top: '-4px', bottom: '-4px' }),
    ]),
    cB('dropdown-divider', { transition: 'background-color .3s var(--rify-bezier)', backgroundColor: 'var(--rify-divider-color)', height: '1px', margin: '4px 0' }),
    cB('dropdown-menu-wrapper', { transformOrigin: 'var(--v-transform-origin)', width: 'fit-content' }),
    c('>', [cB('scrollbar', { height: 'inherit', maxHeight: 'inherit' })]),
    cNotM('scrollable', { padding: 'var(--rify-padding)' }),
    cM('scrollable', [cE('content', { padding: 'var(--rify-padding)' })]),
  ],
);
