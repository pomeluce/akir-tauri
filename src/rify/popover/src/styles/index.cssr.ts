import { type CNode } from 'css-render';
import { type FollowerPlacement } from '../interface';
import { map } from 'lodash-es';
import { c, cB, cM, cNotM, cE, cCB } from '../../../_utils';

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const arrowSize = 'var(--rify-arrow-height) * 1.414';

const getArrowOffset = (placement: FollowerPlacement): string =>
  ['top', 'bottom'].includes(placement.split('-')[0]) ? 'var(--rify-arrow-offset)' : 'var(--rify-arrow-offset-vertical)';

const placementStyle = (placement: FollowerPlacement, arrowStyleLiteral: string): CNode => {
  const position = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';
  const sizeStyle = ['top', 'bottom'].includes(position) ? 'height: var(--rify-space-arrow);' : 'width: var(--rify-space-arrow);';
  return c(`[v-placement="${placement}"] >`, [
    cB('popover-shared', `margin-${oppositePlacement[position]}: var(--rify-space) `, [
      cM('show-arrow', `margin-${oppositePlacement[position]}: var(--rify-space-arrow) `),
      cM('overlap', { margin: 0 }),
      cCB(
        'popover-arrow-wrapper',
        {
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          [position]: '100%',
          [oppositePlacement[position]]: 'auto',
          sizeStyle,
        },
        [cB('popover-arrow', arrowStyleLiteral)],
      ),
    ]),
  ]);
};

// vars:
// --rify-bezier
// --rify-bezier-ease-in
// --rify-bezier-ease-out
// --rify-font-size
// --rify-text-color
// --rify-color
// --rify-border-radius
// --rify-arrow-height
// --rify-arrow-offset
// --rify-arrow-offset-vertical
// --rify-padding
// --rify-space
// --rify-space-arrow
// --rify-divider-color
export default c([
  cB(
    'popover',
    {
      transition: 'box-shadow .3s var(--rify-bezier), background-color .3s var(--rify-bezier), color .3s var(--rify-bezier)',
      position: 'relative',
      fontSize: 'var(--rify-font-size)',
      color: 'var(--rify-text-color)',
      boxShadow: 'var(--rify-box-shadow)',
      wordBreak: 'break-word',
    },
    [
      c('>', [cB('scrollbar', { height: 'inherit', maxHeight: 'inherit' })]),
      cNotM('raw', { backgroundColor: 'var(--rify-color)', borderRadius: 'var(--rify-border-radius)' }, [
        cNotM('scrollable', [cNotM('show-header-or-footer', 'padding: var(--rify-padding);')]),
      ]),
      cE('header', { padding: 'var(--rify-padding)', borderBottom: '1px solid var(--rify-divider-color)', transition: 'border-color .3s var(--rify-bezier)' }),
      cE('footer', { padding: 'var(--rify-padding)', borderTop: '1px solid var(--rify-divider-color)', transition: 'border-color .3s var(--rify-bezier)' }),
      cM('scrollable, show-header-or-footer', [cE('content', { padding: 'var(--rify-padding)' })]),
    ],
  ),
  cB('popover-shared', { transformOrigin: 'inherit' }, [
    cB('popover-arrow-wrapper', { position: 'absolute', overflow: 'hidden', pointerEvents: 'none' }, [
      cB('popover-arrow', {
        transition: 'background-color .3s var(--rify-bezier)',
        position: 'absolute',
        display: 'block',
        width: `calc(${arrowSize})`,
        height: `calc(${arrowSize})`,
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, .12)',
        transform: 'rotate(45deg)',
        backgroundColor: 'var(--rify-color)',
        pointerEvents: 'all',
      }),
    ]),
    // body transition
    c('&.popover-transition-enter-from, &.popover-transition-leave-to', { opacity: 0, transform: 'scale(.85)' }),
    c('&.popover-transition-enter-to, &.popover-transition-leave-from', { transform: 'scale(1)', opacity: 1 }),
    c('&.popover-transition-enter-active', {
      transition:
        'box-shadow .3s var(--rify-bezier), background-color .3s var(--rify-bezier), color .3s var(--rify-bezier), opacity .15s var(--rify-bezier-ease-out), transform .15s var(--rify-bezier-ease-out)',
    }),
    c('&.popover-transition-leave-active', {
      transition:
        'box-shadow .3s var(--rify-bezier), background-color .3s var(--rify-bezier), color .3s var(--rify-bezier), opacity .15s var(--rify-bezier-ease-in), transform .15s var(--rify-bezier-ease-in)',
    }),
  ]),
  placementStyle('top-start', `top: calc(${arrowSize} / -2); left: calc(${getArrowOffset('top-start')} - var(--v-offset-left))`),
  placementStyle('top', `top: calc(${arrowSize} / -2); transform: translateX(calc(${arrowSize} / -2)) rotate(45deg); left: 50%`),
  placementStyle('top-end', `top: calc(${arrowSize} / -2); right: calc(${getArrowOffset('top-end')} + var(--v-offset-left))`),
  placementStyle('bottom-start', `bottom: calc(${arrowSize} / -2); left: calc(${getArrowOffset('bottom-start')} - var(--v-offset-left))`),
  placementStyle('bottom', `bottom: calc(${arrowSize} / -2); transform: translateX(calc(${arrowSize} / -2)) rotate(45deg); left: 50%`),
  placementStyle('bottom-end', `bottom: calc(${arrowSize} / -2); right: calc(${getArrowOffset('bottom-end')} + var(--v-offset-left))`),
  placementStyle('left-start', `left: calc(${arrowSize} / -2); top: calc(${getArrowOffset('left-start')} - var(--v-offset-top))`),
  placementStyle('left', `left: calc(${arrowSize} / -2); transform: translateY(calc(${arrowSize} / -2)) rotate(45deg); top: 50%`),
  placementStyle('left-end', `left: calc(${arrowSize} / -2); bottom: calc(${getArrowOffset('left-end')} + var(--v-offset-top))`),
  placementStyle('right-start', `right: calc(${arrowSize} / -2); top: calc(${getArrowOffset('right-start')} - var(--v-offset-top))`),
  placementStyle('right', `right: calc(${arrowSize} / -2); transform: translateY(calc(${arrowSize} / -2)) rotate(45deg); top: 50%`),
  placementStyle('right-end', `right: calc(${arrowSize} / -2); bottom: calc(${getArrowOffset('right-end')} + var(--v-offset-top))`),
  ...map(
    {
      top: ['right-start', 'left-start'],
      right: ['top-end', 'bottom-end'],
      bottom: ['right-end', 'left-end'],
      left: ['top-start', 'bottom-start'],
    },
    (placements, direction): CNode[] => {
      const isVertical = ['right', 'left'].includes(direction);
      const sizeType = isVertical ? 'width' : 'height';
      return placements.map(placement => {
        const isReverse = placement.split('-')[1] === 'end';
        const targetSize = `var(--v-target-${sizeType}, 0px)`;
        const centerOffset = `calc((${targetSize} - ${arrowSize}) / 2)`;
        const offset = getArrowOffset(placement as FollowerPlacement);
        return c(`[v-placement="${placement}"] >`, [
          cB('popover-shared', [
            cM('center-arrow', [
              cB('popover-arrow', `${direction}: calc(max(${centerOffset}, ${offset}) ${isReverse ? '+' : '-'} var(--v-offset-${isVertical ? 'left' : 'top'}));`),
            ]),
          ]),
        ]);
      });
    },
  ),
]);
