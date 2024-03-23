import { c, cB } from '../../../../_utils';

export default cB(
  'base-icon',
  {
    height: '1em',
    width: '1em',
    lineHeight: '1em',
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    fill: 'currentColor',
    transform: 'translateZ(0)',
  },
  [c('svg', `height: 1em; width: 1em;`)],
);
