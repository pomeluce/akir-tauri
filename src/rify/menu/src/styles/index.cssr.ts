import type { CNode, CNodeChildren, CProperties } from 'css-render';
import { fadeInHeightExpandTransition } from '../../../_styles';
import { c, cB, cE, cM, cNotM } from '../../../_utils';

const hoverStyleChildren = [
  c('&::before', { backgroundColor: 'var(--rify-item-color-hover)' }),
  cE('arrow', { color: 'var(--rify-arrow-color-hover)' }),
  cE('icon', { color: 'var(--rify-item-icon-color-hover)' }),
  cB('menu-item-content-header', { color: 'var(--rify-item-text-color-hover)' }, [
    c('a', { color: 'var(--rify-item-text-color-hover)' }),
    cE('extra', { color: 'var(--rify-item-text-color-hover)' }),
  ]),
];

const horizontalHoverStyleChildren = [
  cE('icon', { color: 'var(--rify-item-icon-color-hover-horizontal)' }),
  cB('menu-item-content-header', { color: 'var(--rify-item-text-color-hover-horizontal)' }, [
    c('a', { color: 'var(--rify-item-text-color-hover-horizontal)' }),
    cE('extra', { color: 'var(--rify-item-text-color-hover-horizontal)' }),
  ]),
];

const hoverStyle = (props: CProperties, children: CNodeChildren): CNode[] => {
  return [cM('hover', props, children), c('&:hover', props, children)];
};

// vars:
// --rify-color
// --rify-group-text-color
// --rify-bezier
// --rify-font-size
// --rify-border-color-horizontal
// --rify-border-radius
// --rify-item-color-hover
// --rify-item-color-active
// --rify-item-color-active-hover
// --rify-item-color-active-collapsed
// --rify-arrow-color
// --rify-arrow-color-hover
// --rify-arrow-color-active
// --rify-arrow-color-active-hover
// --rify-arrow-color-child-active
// --rify-arrow-color-child-active-hover
// --rify-item-text-color
// --rify-item-text-color-hover
// --rify-item-text-color-active
// --rify-item-text-color-active-hover
// --rify-item-text-color-child-active
// --rify-item-text-color-child-active-hover
// --rify-item-text-color-horizontal
// --rify-item-text-color-hover-horizontal
// --rify-item-text-color-active-horizontal
// --rify-item-text-color-active-hover-horizontal
// --rify-item-text-color-child-active-horizontal
// --rify-item-text-color-child-active-hover-horizontal
// --rify-item-icon-color
// --rify-item-icon-color-hover
// --rify-item-icon-color-active
// --rify-item-icon-color-active-hover
// --rify-item-icon-color-child-active
// --rify-item-icon-color-child-active-hover
// --rify-item-icon-color-collapsed
// --rify-item-icon-color-horizontal
// --rify-item-icon-color-hover-horizontal
// --rify-item-icon-color-active-horizontal
// --rify-item-icon-color-active-hover-horizontal
// --rify-item-icon-color-child-active-horizontal
// --rify-item-icon-color-child-active-hover-horizontal
// --rify-item-height
export default c([
  cB(
    'menu',
    {
      backgroundColor: 'var(--rify-color)',
      color: 'var(--rify-item-text-color)',
      overflow: 'hidden',
      transition: 'background-color .3s var(--rify-bezier)',
      boxSizing: 'border-box',
      fontSize: 'var(--rify-font-size)',
      paddingBottom: '6px',
    },
    [
      cM(
        'horizontal',
        {
          maxWidth: '100%',
          width: '100%',
          display: 'flex',
          overflow: 'hidden',
          paddingBottom: 0,
        },
        [
          cB('submenu', 'margin: 0;'),
          cB('menu-item', 'margin: 0;'),
          cB(
            'menu-item-content',
            {
              padding: '0 20px',
              borderBottom: '2px solid #0000',
            },
            [c('&::before', 'display: none;'), cM('selected', 'border-bottom: 2px solid var(--rify-border-color-horizontal)')],
          ),
          cB('menu-item-content', [
            cM('selected', [
              cE('icon', 'color: var(--rify-item-icon-color-active-horizontal);'),
              cB('menu-item-content-header', { color: 'var(--rify-item-text-color-active-horizontal)' }, [
                c('a', 'color: var(--rify-item-text-color-active-horizontal);'),
                cE('extra', 'color: var(--rify-item-text-color-active-horizontal);'),
              ]),
            ]),
            cM('child-active', { borderBottom: '2px solid var(--rify-border-color-horizontal)' }, [
              cB('menu-item-content-header', { color: 'var(--rify-item-text-color-child-active-horizontal)' }, [
                c('a', { color: 'var(--rify-item-text-color-child-active-horizontal)' }),
                cE('extra', { color: 'var(--rify-item-text-color-child-active-horizontal)' }),
              ]),
              cE('icon', { color: 'var(--rify-item-icon-color-child-active-horizontal)' }),
            ]),
            cNotM('disabled', [
              cNotM('selected, child-active', [c('&:focus-within', horizontalHoverStyleChildren)]),
              cM('selected', [
                hoverStyle(null, [
                  cE('icon', 'color: var(--rify-item-icon-color-active-hover-horizontal);'),
                  cB('menu-item-content-header', { color: 'var(--rify-item-text-color-active-hover-horizontal)' }, [
                    c('a', 'color: var(--rify-item-text-color-active-hover-horizontal);'),
                    cE('extra', 'color: var(--rify-item-text-color-active-hover-horizontal);'),
                  ]),
                ]),
              ]),
              cM('child-active', [
                hoverStyle(null, [
                  cE('icon', 'color: var(--rify-item-icon-color-child-active-hover-horizontal);'),
                  cB('menu-item-content-header', { color: 'var(--rify-item-text-color-child-active-hover-horizontal)' }, [
                    c('a', 'color: var(--rify-item-text-color-child-active-hover-horizontal);'),
                    cE('extra', 'color: var(--rify-item-text-color-child-active-hover-horizontal);'),
                  ]),
                ]),
              ]),
              hoverStyle('border-bottom: 2px solid var(--rify-border-color-horizontal);', horizontalHoverStyleChildren),
            ]),
            cB('menu-item-content-header', [c('a', 'color: var(--rify-item-text-color-horizontal);')]),
          ]),
        ],
      ),
      cNotM('responsive', [cB('menu-item-content-header', { overflow: 'hidden', textOverflow: 'ellipsis' })]),
      cM('collapsed', [
        cB('menu-item-content', [
          cM('selected', [c('&::before', { backgroundColor: 'var(--rify-item-color-active-collapsed) !important' })]),
          cB('menu-item-content-header', 'opacity: 0;'),
          cE('arrow', 'opacity: 0;'),
          cE('icon', 'color: var(--rify-item-icon-color-collapsed);'),
        ]),
      ]),
      cB('menu-item', {
        height: 'var(--rify-item-height)',
        margintop: '6px',
        position: 'relative',
      }),
      cB(
        'menu-item-content',
        {
          boxSizing: 'border-box',
          lineHeight: 1.75,
          height: '100%',
          display: 'grid',
          gridTemplateAreas: 'icon content arrow',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          paddingright: '18px',
          transition: 'background-color .3s var(--rify-bezier), padding-left .3s var(--rify-bezier), border-color .3s var(--rify-bezier)',
        },
        [
          c('> *', 'z-index: 1;'),
          c('&::before', {
            zIndex: 'auto',
            content: '""',
            backgroundColor: '#0000',
            position: 'absolute',
            left: '8px',
            right: '8px',
            top: 0,
            bottom: 0,
            pointerEvents: 'none',
            borderRadius: 'var(--rify-border-radius)',
            transition: 'background-color .3s var(--rify-bezier)',
          }),
          cM('disabled', { opacity: '.45', cursor: 'not-allowed' }),
          cM('collapsed', [cE('arrow', 'transform: rotate(0);')]),
          cM('selected', [
            c('&::before', 'background-color: var(--rify-item-color-active);'),
            cE('arrow', 'color: var(--rify-arrow-color-active);'),
            cE('icon', 'color: var(--rify-item-icon-color-active);'),
            cB('menu-item-content-header', { color: 'var(--rify-item-text-color-active)' }, [
              c('a', 'color: var(--rify-item-text-color-active);'),
              cE('extra', 'color: var(--rify-item-text-color-active);'),
            ]),
          ]),
          cM('child-active', [
            cB('menu-item-content-header', { color: 'var(--rify-item-text-color-child-active)' }, [
              c('a', { color: 'var(--rify-item-text-color-child-active)' }),
              cE('extra', { color: 'var(--rify-item-text-color-child-active)' }),
            ]),
            cE('arrow', { color: 'var(--rify-arrow-color-child-active)' }),
            cE('icon', { color: 'var(--rify-item-icon-color-child-active)' }),
          ]),
          cNotM('disabled', [
            cNotM('selected, child-active', [c('&:focus-within', hoverStyleChildren)]),
            cM('selected', [
              hoverStyle(null, [
                cE('arrow', 'color: var(--rify-arrow-color-active-hover);'),
                cE('icon', 'color: var(--rify-item-icon-color-active-hover);'),
                cB('menu-item-content-header', { color: 'var(--rify-item-text-color-active-hover)' }, [
                  c('a', 'color: var(--rify-item-text-color-active-hover);'),
                  cE('extra', 'color: var(--rify-item-text-color-active-hover);'),
                ]),
              ]),
            ]),
            cM('child-active', [
              hoverStyle(null, [
                cE('arrow', 'color: var(--rify-arrow-color-child-active-hover);'),
                cE('icon', 'color: var(--rify-item-icon-color-child-active-hover);'),
                cB('menu-item-content-header', { color: 'var(--rify-item-text-color-child-active-hover)' }, [
                  c('a', 'color: var(--rify-item-text-color-child-active-hover);'),
                  cE('extra', 'color: var(--rify-item-text-color-child-active-hover);'),
                ]),
              ]),
            ]),
            cM('selected', [hoverStyle(null, [c('&::before', 'background-color: var(--rify-item-color-active-hover);')])]),
            hoverStyle(null, hoverStyleChildren),
          ]),
          cE('icon', {
            gridArea: 'icon',
            color: 'var(--rify-item-icon-color)',
            transition: 'color .3s var(--rify-bezier), font-size .3s var(--rify-bezier), margin-right .3s var(--rify-bezier)',
            boxSizing: 'content-box',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }),
          cE('arrow', {
            gridArea: 'arrow',
            fontSize: '16px',
            color: 'var(--rify-arrow-color)',
            transform: 'rotate(180deg)',
            opacity: 1,
            transition: 'color .3s var(--rify-bezier), transform 0.2s var(--rify-bezier), opacity 0.2s var(--rify-bezier)',
          }),
          cB(
            'menu-item-content-header',
            {
              gridArea: 'content',
              transition: 'color .3s var(--rify-bezier), opacity .3s var(--rify-bezier)',
              opacity: 1,
              whiteSpace: 'nowrap',
              color: 'var(--rify-item-text-color)',
            },
            [
              c('a', { outline: 'none', textDecoration: 'none', transition: 'color .3s var(--rify-bezier)', color: 'var(--rify-item-text-color)' }, [
                c('&::before', { content: '""', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }),
              ]),
              cE('extra', { fontSize: '.93em', color: 'var(--rify-group-text-color)', transition: 'color .3s var(--rify-bezier)' }),
            ],
          ),
        ],
      ),
      cB('submenu', { cursor: 'pointer', position: 'relative', marginTop: '6px' }, [
        cB('menu-item-content', { height: 'var(--rify-item-height)' }),
        cB('submenu-children', { overflow: 'hidden', padding: 0 }, [fadeInHeightExpandTransition({ duration: '.2s' })]),
      ]),
      cB('menu-item-group', [
        cB('menu-item-group-title', {
          marginTop: '6px',
          color: 'var(--rify-group-text-color)',
          cursor: 'default',
          fontSize: '.93em',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          transition: 'padding-left .3s var(--rify-bezier), color .3s var(--rify-bezier)',
        }),
      ]),
    ],
  ),
  cB('menu-tooltip', [c('a', { color: 'inherit', textDecoration: 'none' })]),
  cB('menu-divider', {
    transition: 'background-color .3s var(--rify-bezier)',
    backgroundColor: 'var(--rify-divider-color)',
    height: '1px',
    margin: '6px 18px',
  }),
]);
