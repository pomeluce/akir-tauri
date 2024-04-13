import { c, cB, cNotB } from '../../../_utils';

// --rify-bezier
// --rify-border-color
// --rify-border-radius
// --rify-font-size
// --rify-line-type
// --rify-menu-active-bar-border-width
// --rify-menu-item-color
// --rify-menu-item-bg
// --rify-motion-duration
// --rify-text-color

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
      c(({ props: { bPrefix } }) => `[class^="${(bPrefix as string).substring(1)}menu"], [class*=" ${(bPrefix as string).substring(1)}menu"]`, {
        boxSizing: 'border-box',
      }),
      cB('menu-submenu', { transformOrigin: '0 0' }),
      cB(({ props: { bPrefix } }) => `menu-item, ${bPrefix}menu-submenu, ${bPrefix}menu-submenu-title`, { borderRadius: 'var(--rify-border-radius)' }),
    ],
  ),
  cB('menu-inline', { width: '100%' }, [cNotB('menu-root', { boxShadow: 'none' })]),
  cB('menu-vertical', [cNotB('menu-root', { boxShadow: 'none' })]),
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
    ],
  ),
]);
