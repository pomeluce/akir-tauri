import { c, cB, cNotB } from '../../../_utils';

// --rify-font-size

export default c([
  cB(
    'menu-rtl',
    {
      direction: 'rtl',
    },
    [
      cNotB('menu-vertical', [
        cB('menu-submenu-arrow', [
          c('&::before', {
            transform: 'rotate(-45deg) translateY(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
          }),
          c('&::after', {
            transform: 'rotate(45deg) translateY(calc(calc(var(--rify-font-size)/7 * 5) * 0.25))',
          }),
        ]),
      ]),
    ],
  ),
  cB(
    'menu-submenu-rtl',
    {
      transformOrigin: '100% 0',
    },
    [
      cNotB('menu-vertical', [
        cB('menu-submenu-arrow', [
          c('&::before', {
            transform: 'rotate(-45deg) translateY(calc(calc(calc(var(--rify-font-size)/7 * 5) * 0.25) * -1))',
          }),
          c('&::after', {
            transform: 'rotate(45deg) translateY(calc(calc(var(--rify-font-size)/7 * 5) * 0.25))',
          }),
        ]),
      ]),
    ],
  ),
]);
