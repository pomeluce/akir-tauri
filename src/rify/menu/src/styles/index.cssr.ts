import { c, cB, cNotB } from '../../../_utils';

// --rify-bezier
// --rify-bezier-x
// --rify-border-color
// --rify-border-radius
// --rify-font-size
// --rify-font-size-lg
// --rify-group-line-height
// --rify-group-title-color
// --rify-line-width
// --rify-line-type
// --rify-margin
// --rify-margin-xs
// --rify-menu-active-bar-border-width
// --rify-menu-active-bar-width
// --rify-menu-collapsed-icon-size
// --rify-menu-collapsed-width
// --rify-menu-icon-margin-inline-end
// --rify-menu-item-bg
// --rify-menu-item-color
// --rify-menu-item-height
// --rify-menu-item-margin-block
// --rify-menu-item-margin-inline
// --rify-menu-item-selected-color
// --rify-menu-item-selected-bg
// --rify-menu-item-width
// --rify-motion-duration
// --rify-motion-duration-mid
// --rify-padding
// --rify-text-color

// dark theme
// --rify-dark-border-color
// --rify-dark-color
// --rify-dark-group-title-color
// --rify-menu-dark-item-bg
// --rify-menu-dark-item-color
// --rify-menu-dark-item-selected-bg
// --rify-menu-dark-item-selected-color

export default c([
  cB(
    'menu',
    {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      color: 'var(--rify-text-color)',
      fontSize: 'var(--rify-font-size)',
      lineHeight: 0,
      listStyle: 'none',
      paddingInlineStart: 0,
      outline: 'none',
      transition: 'width var(--rify-motion-duration) var(--rify-bezier) 0s',
    },
    [
      c('ul, ol', {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }),
      c('&:before', {
        content: '""',
        display: 'table',
        boxSizing: 'border-box',
      }),
      c('&:after', {
        content: '""',
        display: 'table',
        clear: 'both',
        boxSizing: 'border-box',
      }),
      c(
        ({ props: { bPrefix } }) => `[class^="${(bPrefix as string).substring(1)}menu"], [class*=" ${(bPrefix as string).substring(1)}menu"]`,
        {
          boxSizing: 'border-box',
        },
        [
          c('&:before, &:after', {
            boxSizing: 'border-box',
          }),
        ],
      ),
      cB('menu-submenu', { transformOrigin: '0 0' }, [
        cB('menu-sub', {
          cursor: 'initial',
          transition: 'background var(--rify-motion-duration) var(--rify-bezier),padding var(--rify-motion-duration) var(--rify-bezier)',
        }),
      ]),
      cB(({ props: { bPrefix } }) => `menu-submenu, ${bPrefix}menu-submenu-inline`, {
        transition:
          'border-color var(--rify-motion-duration) var(--rify-bezier),background var(--rify-motion-duration) var(--rify-bezier),padding var(--rify-motion-duration-mid) var(--rify-bezier)',
      }),
      cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu, ${bPrefix}menu-submenu-title`, { borderRadius: 'var(--rify-border-radius)' }),
      cB(
        ({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`,
        {
          position: 'relative',
          display: 'block',
          margin: 0,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          transition: 'border-color var(--rify-motion-duration),background var(--rify-motion-duration),padding var(--rify-motion-duration) var(--rify-bezier);',
        },
        [
          cB('menu-item-icon + span, .i-icon + span', {
            marginInlineStart: 'var(--rify-menu-icon-margin-inline-end)',
            opacity: 1,
            transition: 'opacity var(--rify-motion-duration) var(--rify-bezier),margin var(--rify-motion-duration),color var(--rify-motion-duration)',
          }),
        ],
      ),
      cB('menu-item-group-title', {
        padding: 'calc(var(--rify-padding) / 2) var(--rify-padding)',
        fontSize: 'var(--rify-font-size)',
        lineHeight: 'var(--rify-group-line-height)',
        transition: 'all var(--rify-motion-duration)',
      }),
      cB('menu-item-group', [
        cB('menu-item-group-list', {
          margin: 0,
          padding: 0,
        }),
      ]),
      cB(({ props: { bPrefix } }) => `menu-submenu-expand-icon, ${bPrefix}menu-submenu-arrow`, {
        position: 'absolute',
        top: '50%',
        insetInlineEnd: 'var(--rify-margin)',
        width: 'calc(var(--rify-font-size) / 7 * 5)',
        color: 'currentcolor',
        transform: 'translateY(-50%)',
        transition: 'transform var(--rify-motion-duration) var(--rify-bezier),opacity var(--rify-motion-duration)',
      }),
      cB('menu-submenu-open', [
        cNotB('menu-submenu-inline', [
          c(({ props: { bPrefix } }) => `> ${bPrefix}menu-submenu-title > ${bPrefix}menu-submenu-arrow`, {
            transform: 'translateY(calc(calc(var(--rify-font-size)/7 * 5) * 0.2 * -1))',
          }),
        ]),
      ]),
      cB('menu-submenu-arrow', [
        c('&::before', {
          transform: 'rotate(45deg) translateY(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
        }),
        c('&::before, &::after', {
          content: '""',
          position: 'absolute',
          width: 'calc(calc(var(--rify-font-size)/7 * 5) * 0.6)',
          height: 'calc(calc(var(--rify-font-size)/7 * 5) * 0.15)',
          backgroundColor: 'currentcolor',
          borderRadius: 'var(--rify-border-radius)',
          transition:
            'background var(--rify-motion-duration) var(--rify-bezier),transform var(--rify-motion-duration) var(--rify-bezier),top var(--rify-motion-duration) var(--rify-bezier),color var(--rify-motion-duration) var(--rify-bezier)',
        }),
      ]),
      cB('menu-submenu-open', [
        cNotB('menu-submenu-inline', [
          c(
            ({ props: { bPrefix } }) => `> ${bPrefix}menu-submenu-title > ${bPrefix}menu-submenu-arrow`,
            {
              transform: 'translateY(calc(calc(var(--rify-font-size)/7 * 5) * 0.2 * -1))',
            },
            [
              c('&::after', {
                transform: 'rotate(-45deg) translateX(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
              }),
              c('&::before', {
                transform: 'rotate(45deg) translateX(calc(calc(var(--rify-font-size)/7 * 5) * 0.25))',
              }),
            ],
          ),
        ]),
      ]),
      cB('menu-item-divider', {
        overflow: 'hidden',
        lineHeight: 0,
        borderColor: 'var(--rify-dark-border-color)',
        borderStyle: 'var(--rify-line-type)',
        borderWidth: 0,
        borderTopWidth: 'var(--rify-line-width)',
        marginBlock: 'var(--rify-line-width)',
        padding: 0,
      }),
      cB('motion-collapse-legacy', {
        overflow: 'hidden',
      }),
      cB('motion-collapse-legacy-active', {
        transition: 'height var(--rify-motion-duration-mid) var(--rify-bezier),opacity var(--rify-motion-duration-mid) var(--rify-bezier)!important',
      }),
      cB('motion-collapse', {
        overflow: 'hidden',
        transition: 'height var(--rify-motion-duration-mid) var(--rify-bezier),opacity var(--rify-motion-duration-mid) var(--rify-bezier)!important',
      }),
    ],
  ),
  cB('menu-inline', { width: '100%' }, [
    cNotB('menu-root', { boxShadow: 'none' }, [
      cB(
        ({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`,
        {
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color var(--rify-motion-duration),background var(--rify-motion-duration),padding var(--rify-motion-duration-mid) var(--rify-bezier-x)',
        },
        [
          c(({ props: { bPrefix } }) => `> ${bPrefix}menu-title-content`, {
            flex: 'auto',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }),
          c('> *', {
            flex: 'none',
          }),
        ],
      ),
    ]),
    cB('menu-item', {
      position: 'relative',
      overflow: 'hidden',
      listStylePosition: 'inside',
      listStyleType: 'disc',
    }),
    cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`, {
      height: 'var(--rify-menu-item-height)',
      lineHeight: 'var(--rify-menu-item-height)',
      paddingInline: 'var(--rify-padding)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginInline: 'var(--rify-menu-item-margin-inline)',
      marginBlock: 'var(--rify-menu-item-margin-block)',
      width: 'var(--rify-menu-item-width)',
    }),
    cB('menu-item-group-list', [
      cB('menu-submenu-title', {
        paddingInlineEnd: 'calc(calc(var(--rify-font-size) / 7 * 5) + var(--rify-padding) + var(--rify-margin-xs))',
      }),
    ]),
    cB('menu-submenu-title', {
      paddingInlineEnd: 'calc(calc(var(--rify-font-size) / 7 * 5) + var(--rify-padding) + var(--rify-margin-xs))',
    }),
    c(({ props: { bPrefix } }) => `> ${bPrefix}menu-item, > ${bPrefix}menu-submenu > ${bPrefix}menu-submenu-title`, {
      height: 'var(--rify-menu-item-height)',
      lineHeight: 'var(--rify-menu-item-height)',
    }),
    cB('menu-sub', [
      cNotB(
        'menu-inline',
        {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: 'none',
        },
        [
          cB('menu-item-group-title', {
            paddingInlineStart: 'calc(var(--rify-padding) * 2)',
          }),
        ],
      ),
    ]),
    cB('menu-submenu-arrow', [
      c('&:before', {
        transform: 'rotate(-45deg) translateX(calc(calc(var(--rify-font-size)/7 * 5) * 0.25))',
      }),
      c('&:after', {
        transform: 'rotate(45deg) translateX(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
      }),
    ]),
  ]),
  cB('menu-vertical', [
    cNotB('menu-root', { boxShadow: 'none' }),
    cB('menu-item', {
      position: 'relative',
      overflow: 'hidden',
    }),
    cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`, {
      height: 'var(--rify-menu-item-height)',
      lineHeight: 'var(--rify-menu-item-height)',
      paddingInline: 'var(--rify-padding)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginInline: 'var(--rify-menu-item-margin-inline)',
      marginBlock: 'var(--rify-menu-item-margin-block)',
      width: 'var(--rify-menu-item-width)',
    }),
    cB('menu-item-group-list', [
      cB('menu-submenu-title', {
        paddingInlineEnd: 'calc(calc(var(--rify-font-size) / 7 * 5) + var(--rify-padding) + var(--rify-margin-xs))',
      }),
    ]),
    cB('menu-submenu-title', {
      paddingInlineEnd: 'calc(calc(var(--rify-font-size) / 7 * 5) + var(--rify-padding) + var(--rify-margin-xs))',
    }),
    c(({ props: { bPrefix } }) => `> ${bPrefix}menu-item, > ${bPrefix}menu-submenu > ${bPrefix}menu-submenu-title`, {
      height: 'var(--rify-menu-item-height)',
      lineHeight: 'var(--rify-menu-item-height)',
    }),
  ]),
  cB(
    'menu-light',
    {
      color: 'var(--rify-menu-item-color)',
      background: 'var(--rify-color)',
    },
    [
      cNotB('menu-root', [
        cNotB('menu-inline', {
          borderInlineEnd: 'var(--rify-menu-active-bar-border-width) var(--rify-line-type) var(--rify-border-color)',
        }),
      ]),
      cB('menu-submenu-selected', [
        c(({ props: { bPrefix } }) => `> ${bPrefix}menu-submenu-title`, {
          color: 'var(--rify-menu-item-selected-color)',
        }),
      ]),
      cNotB('menu-inline', [
        cB('menu-sub', [
          cNotB('menu-inline', {
            background: 'var(--rify-menu-item-bg)',
          }),
        ]),
        cB(
          'menu-item',
          {
            position: 'relative',
          },
          [
            c('&::after', {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: 'var(--rify-menu-active-bar-width) solid var(--rify-menu-item-selected-color)',
              transform: 'scaleY(.0001)',
              opacity: 0,
              transition: 'transform var(--rify-motion-duration-mid) var(--rify-bezier-x),opacity var(--rify-motion-duration-mid) var(--rify-bezier-x)',
            }),
          ],
        ),
        cB(
          ({ props: { bPrefix } }) => `menu-selected, ${bPrefix}menu-item-selected`,
          [
            c('&::after', {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: 'transform var(--rify-motion-duration-mid) var(--rify-bezier),opacity var(--rify-motion-duration-mid) var(--rify-bezier)',
            }),
          ],
        ),
      ]),
      cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`, {
        color: 'var(--rify-menu-item-color)',
      }),
      cB('menu-item-selected', {
        color: 'var(--rify-menu-item-selected-color)',
        backgroundColor: 'var(--rify-menu-item-selected-bg)',
      }),
      cB('menu-item-group-title', {
        color: 'var(--rify-group-title-color)',
      }),
    ],
  ),
  cB(
    'menu-dark',
    {
      color: 'var(--rify-menu-dark-item-color)',
      background: 'var(--rify-dark-color)',
    },
    [
      cNotB('menu-root', [
        c(({ props: { bPrefix } }) => `&${bPrefix}menu-inline, &${bPrefix}menu-vertical`, {
          borderInlineEnd: '0 var(--rify-line-type) var(--rify-border-color)',
        }),
      ]),
      cB('menu-submenu-selected', [
        c(({ props: { bPrefix } }) => `> ${bPrefix}menu-submenu-title`, {
          color: 'var(--rify-menu-dark-item-selected-color)',
        }),
      ]),

      cNotB('menu-inline', [
        cB('menu-sub', [
          cNotB('menu-inline', {
            background: 'var(--rify-menu-dark-item-bg)',
          }),
        ]),
        cB(
          'menu-item',
          {
            position: 'relative',
          },
          [
            c('&::after', {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: 'var(--rify-menu-active-bar-width) solid var(--rify-menu-dark-item-selected-color)',
              transform: 'scaleY(.0001)',
              opacity: 0,
              transition: 'transform var(--rify-motion-duration-mid) var(--rify-bezier-x),opacity var(--rify-motion-duration-mid) var(--rify-bezier-x)',
            }),
          ],
        ),
        cB(
          ({ props: { bPrefix } }) => `menu-selected, ${bPrefix}menu-item-selected`,
          [
            c('&::after', {
              transform: 'scaleY(1)',
              opacity: 1,
              transition: 'transform var(--rify-motion-duration-mid) var(--rify-bezier),opacity var(--rify-motion-duration-mid) var(--rify-bezier)',
            }),
          ],
        ),
      ]),
      cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu-title`, {
        color: 'var(--rify-menu-dark-item-color)',
      }),
      cB('menu-item-selected', {
        color: 'var(--rify-menu-dark-item-selected-color)',
        backgroundColor: 'var(--rify-menu-dark-item-selected-bg)',
      }),
      cB('menu-item-group-title', {
        color: 'var(--rify-dark-group-title-color)',
      }),
    ],
  ),
  cB('menu-hidden', {
    display: 'none',
  }),
  cB('submenu--hidden', {
    display: 'none',
  }),
  cB(
    'menu-inline-collapsed',
    {
      width: 'var(--rify-menu-collapsed-width)',
    },
    [
      c(
        ({ props: { bPrefix } }) =>
          `> ${bPrefix}menu-item, > ${bPrefix}menu-item-group > ${bPrefix}menu-item-group-list > ${bPrefix}menu-item, > ${bPrefix}menu-item-group > ${bPrefix}menu-item-group-list > ${bPrefix}menu-submenu > ${bPrefix}menu-submenu-title, > ${bPrefix}menu-submenu > ${bPrefix}menu-submenu-title`,
        {
          insetInlineStart: 0,
          paddingInline: 'calc(50% - calc(var(--rify-font-size-lg)/2) - var(--rify-menu-item-margin-inline))',
          textOverflow: 'clip',
        },
        [
          cB('menu-item-icon, i-icon', {
            margin: 0,
            fontSize: 'var(--rify-menu-collapsed-icon-size)',
            lineHeight: 'var(--rify-menu-item-height)',
          }),
          cB('menu-item-icon + span, i-icon + span', {
            display: 'inline-block',
            opacity: 0,
          }),
          cB(({ props: { bPrefix } }) => `menu-submenu-arrow, ${bPrefix}menu-submenu-expand-icon`, {
            opacity: 0,
          }),
        ],
      ),
      cB('menu-submenu-arrow', [
        c('&:before', {
          transform: 'rotate(-45deg) translateX(calc(calc(var(--rify-font-size)/7 * 5) * 0.25))',
        }),
        c('&:after', {
          transform: 'rotate(45deg) translateX(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
        }),
      ]),
    ],
  ),
]);
