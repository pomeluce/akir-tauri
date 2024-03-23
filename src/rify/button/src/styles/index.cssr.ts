import { c, cB, cE, cM, cNotM, isBrowser } from '../../../_utils';
import { fadeInWidthExpandTransition } from '../../../_styles/transitions/fade-in-width-expand.cssr';
import { iconSwitchTransition } from '../../../_styles/transitions/icon-switch.cssr';

// vars:
// --rify-bezier
// --rify-bezier-ease-out
// --rify-ripple-duration
// --rify-opacity-disabled
// --rify-text-color
// --rify-text-color-hover
// --rify-text-color-pressed
// --rify-text-color-focus
// --rify-text-color-disabled
// --rify-color
// --rify-color-hover
// --rify-color-pressed
// --rify-color-focus
// --rify-color-disabled
// --rify-border
// --rify-border-hover
// --rify-border-pressed
// --rify-border-focus
// --rify-border-disabled
// --rify-ripple-color
// --rify-border-radius
// --rify-height
// --rify-width
// --rify-font-size
// --rify-padding
// --rify-icon-size
// --rify-icon-margin
// --rify-wave-opacity
// --rify-font-weight
//
// private-vars:
// --rify-border-color-xxx, used for custom color

export default c([
  cB(
    'button',
    {
      margin: 0,
      fontWeight: 'var(--rify-font-weight)',
      lineHeight: 1,
      fontFamily: 'inherit',
      padding: 'var(--rify-padding)',
      height: 'var(--rify-height)',
      fontSize: 'var(--rify-font-size)',
      borderRadius: 'var(--rify-border-radius)',
      color: 'var(--rify-text-color)',
      backgroundColor: 'var(--rify-color)',
      width: 'var(--rify-width)',
      whiteSpace: 'nowrap',
      outline: 'none',
      position: 'relative',
      zIndex: 'auto',
      border: 'none',
      display: 'inline-flex',
      flexWrap: 'nowrap',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color .3s var(--rify-bezier), background-color .3s var(--rify-bezier), opacity .3s var(--rify-bezier), border-color .3s var(--rify-bezier)',
    },
    [
      cM('color', [
        cE('border', {
          borderColor: 'var(--rify-border-color)',
        }),
        cM('disabled', [
          cE('border', {
            borderColor: 'var(--rify-border-color-disabled)',
          }),
        ]),
        cNotM('disabled', [
          c('&:focus', [
            cE('state-border', {
              borderColor: 'var(--rify-border-color-focus)',
            }),
          ]),
          c('&:hover', [
            cE('state-border', {
              borderColor: 'var(--rify-border-color-hover)',
            }),
          ]),
          c('&:active', [
            cE('state-border', {
              borderColor: 'var(--rify-border-color-pressed)',
            }),
          ]),
          cM('pressed', [
            cE('state-border', {
              borderColor: 'var(--rify-border-color-pressed)',
            }),
          ]),
        ]),
      ]),
      cM(
        'disabled',
        {
          backgroundColor: 'var(--rify-color-disabled)',
          color: 'var(--rify-text-color-disabled)',
        },
        [
          cE('border', {
            border: 'var(--rify-border-disabled)',
          }),
        ],
      ),
      cNotM('disabled', [
        c(
          '&:focus',
          {
            backgroundColor: 'var(--rify-color-focus)',
            color: 'var(--rify-text-color-focus)',
          },
          [
            cE('state-border', {
              border: 'var(--rify-border-focus)',
            }),
          ],
        ),
        c(
          '&:hover',
          {
            backgroundColor: 'var(--rify-color-hover)',
            color: 'var(--rify-text-color-hover)',
          },
          [
            cE('state-border', {
              border: 'var(--rify-border-hover)',
            }),
          ],
        ),
        c(
          '&:active',
          {
            backgroundColor: 'var(--rify-color-pressed)',
            color: 'var(--rify-text-color-pressed)',
          },
          [
            cE('state-border', {
              border: 'var(--rify-border-pressed)',
            }),
          ],
        ),
        cM(
          'pressed',
          {
            backgroundColor: 'var(--rify-color-pressed)',
            color: 'var(--rify-text-color-pressed)',
          },
          [
            cE('state-border', {
              border: 'var(--rify-border-pressed)',
            }),
          ],
        ),
      ]),
      cM('loading', 'cursor: wait;'),
      cB(
        'base-wave',
        `
          pointer-events: none;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          animation-iteration-count: 1;
          animation-duration: var(--rify-ripple-duration);
          animation-timing-function: var(--rify-bezier-ease-out);
        `,
        [
          cM('active', {
            zIndex: 1,
            animationName: 'button-wave-ping',
          }),
        ],
      ),
      isBrowser && 'MozBoxSizing' in document.createElement('div').style
        ? c('&::moz-focus-inner', {
            border: 0,
          })
        : null,
      cE(
        'border, state-border',
        `
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          transition: border-color .3s var(--rify-bezier);
          pointer-events: none;
        `,
      ),
      cE('border', {
        border: 'var(--rify-border)',
      }),
      cE('state-border', {
        border: 'var(--rify-border)',
        borderColor: '#0000',
        zIndex: 1,
      }),
      cE(
        'icon',
        `
          margin: var(--rify-icon-margin);
          margin-left: 0;
          height: var(--rify-icon-size);
          width: var(--rify-icon-size);
          max-width: var(--rify-icon-size);
          font-size: var(--rify-icon-size);
          position: relative;
          flex-shrink: 0;
        `,
        [
          cB(
            'icon-slot',
            `
              height: var(--rify-icon-size);
              width: var(--rify-icon-size);
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              display: flex;
              align-items: center;
              justify-content: center;
            `,
            [
              iconSwitchTransition({
                top: '50%',
                originalTransform: 'translateY(-50%)',
              }),
            ],
          ),
          fadeInWidthExpandTransition(),
        ],
      ),
      cE(
        'content',
        `
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          min-width: 0;
        `,
        [
          c('~', [
            cE('icon', {
              margin: 'var(--rify-icon-margin)',
              marginRight: 0,
            }),
          ]),
        ],
      ),
      cM(
        'block',
        `
          display: flex;
          width: 100%;
        `,
      ),
      cM('dashed', [
        cE('border, state-border', {
          borderStyle: 'dashed !important',
        }),
      ]),
      cM('disabled', {
        cursor: 'not-allowed',
        opacity: 'var(--rify-opacity-disabled)',
      }),
    ],
  ),
  c('@keyframes button-wave-ping', {
    from: {
      opacity: 'var(--rify-wave-opacity)',
      boxShadow: '0 0 0.5px 0 var(--rify-ripple-color)',
    },
    to: {
      // don't use exact 5px since chrome will display the animation with glitches
      opacity: 0,
      boxShadow: '0 0 0.5px 4.5px var(--rify-ripple-color)',
    },
  }),
]);
