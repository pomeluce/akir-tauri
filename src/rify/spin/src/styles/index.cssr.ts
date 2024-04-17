import { c, cM, cB, cE } from '../../../_utils/cssr';
import { fadeInTransition } from '../../../_styles';

// vars:
// --rify-bezier
// --rify-opacity-spinning
// --rify-size
// --rify-color
// --rify-text-color
// --rify-font-size
// --rify-mask-color
export default c([
  c('@keyframes spin-rotate', {
    from: {
      transform: 'rotate(0)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  }),
  cB('spin-container', { position: 'relative' }, [
    cB(
      'spin-body',
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      },
      [fadeInTransition()],
    ),
  ]),
  cB('spin-body', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  cB(
    'spin',
    {
      display: 'inline-flex',
      height: 'var(--rify-size)',
      width: 'var(--rify-size)',
      fontSize: 'var(--rify-size)',
      color: 'var(--rify-color)',
    },
    [cM('rotate', { animation: 'spin-rotate 2s linear infinite' })],
  ),
  cB('spin-description', {
    display: 'inline-block',
    fontSize: 'var(--rify-font-size)',
    color: 'var(--rify-text-color)',
    transition: 'color .3s var(--rify-bezier)',
    marginTop: '8px',
  }),
  cB(
    'spin-content',
    {
      position: 'relative',
      opacity: 1,
      transition: 'opacity .3s var(--rify-bezier)',
      pointerEvents: 'all',
    },
    [
      cM(
        'spinning',
        {
          userSelect: 'none',
          '-webkit-user-select': 'none',
          pointerEvents: 'none',
          opacity: 'var(--rify-opacity-spinning)',
        },
        [
          cE('mask', {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--rify-mask-color)',
          }),
        ],
      ),
    ],
  ),
]);
