import { c, cB, cE, cM } from '../../../_utils';
import { iconSwitchTransition, fadeInHeightExpandTransition } from '../../../_styles';

// vars:
// --rify-margin
// --rify-bezier
// --rify-padding
// --rify-max-width
// --rify-font-size
// --rify-icon-margin
// --rify-icon-size
// --rify-text-color
// --rify-color
// --rify-box-shadow
// --rify-icon-color-default
// --rify-icon-color-info
// --rify-icon-color-success
// --rify-icon-color-warning
// --rify-icon-color-error
// --rify-icon-color-loading
// --rify-close-size
// --rify-close-icon-size
// --rify-close-margin
// --rify-close-color-hover
// --rify-close-color-pressed
// --rify-close-border-radius
// --rify-close-icon-color
// --rify-close-icon-color-pressed
// --rify-close-icon-color-hover
// --rify-border-radius
export default c([
  cB(
    'message-wrapper',
    `
    margin: var(--rify-margin);
    z-index: 0;
    transform-origin: top center;
    display: flex;
  `,
    [
      fadeInHeightExpandTransition({
        overflow: 'visible',
        originalTransition: 'transform .3s var(--rify-bezier)',
        enterToProps: {
          transform: 'scale(1)',
        },
        leaveToProps: {
          transform: 'scale(0.85)',
        },
      }),
    ],
  ),
  cB(
    'message',
    `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition:
      color .3s var(--rify-bezier),
      box-shadow .3s var(--rify-bezier),
      background-color .3s var(--rify-bezier),
      opacity .3s var(--rify-bezier),
      transform .3s var(--rify-bezier),
      margin-bottom .3s var(--rify-bezier);
    padding: var(--rify-padding);
    border-radius: var(--rify-border-radius);
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: var(--rify-max-width);
    color: var(--rify-text-color);
    background-color: var(--rify-color);
    box-shadow: var(--rify-box-shadow);
  `,
    [
      cE(
        'content',
        `
      display: inline-block;
      line-height: var(--rify-line-height);
      font-size: var(--rify-font-size);
    `,
      ),
      cE(
        'icon',
        `
      position: relative;
      margin: var(--rify-icon-margin);
      height: var(--rify-icon-size);
      width: var(--rify-icon-size);
      font-size: var(--rify-icon-size);
      flex-shrink: 0;
    `,
        [
          ['default', 'info', 'success', 'warning', 'error', 'loading'].map(type =>
            cM(`${type}-type`, [
              c(
                '> *',
                `
            color: var(--rify-icon-color-${type});
            transition: color .3s var(--rify-bezier);
          `,
              ),
            ]),
          ),
          c(
            '> *',
            `
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      `,
            [iconSwitchTransition()],
          ),
        ],
      ),
      cE(
        'close',
        `
      margin: var(--rify-close-margin);
      transition:
        background-color .3s var(--rify-bezier),
        color .3s var(--rify-bezier);
      flex-shrink: 0;
    `,
        [
          c(
            '&:hover',
            `
        color: var(--rify-close-icon-color-hover);
      `,
          ),
          c(
            '&:active',
            `
        color: var(--rify-close-icon-color-pressed);
      `,
          ),
        ],
      ),
    ],
  ),
  cB(
    'message-container',
    `
    z-index: 6000;
    position: fixed;
    height: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
    [
      cM(
        'top',
        `
      top: 12px;
      left: 0;
      right: 0;
    `,
      ),
      cM(
        'top-left',
        `
      top: 12px;
      left: 12px;
      right: 0;
      align-items: flex-start;
    `,
      ),
      cM(
        'top-right',
        `
      top: 12px;
      left: 0;
      right: 12px;
      align-items: flex-end;
    `,
      ),
      cM(
        'bottom',
        `
      bottom: 4px;
      left: 0;
      right: 0;
      justify-content: flex-end;
    `,
      ),
      cM(
        'bottom-left',
        `
      bottom: 4px;
      left: 12px;
      right: 0;
      justify-content: flex-end;
      align-items: flex-start;
    `,
      ),
      cM(
        'bottom-right',
        `
      bottom: 4px;
      left: 0;
      right: 12px;
      justify-content: flex-end;
      align-items: flex-end;
    `,
      ),
    ],
  ),
]);
