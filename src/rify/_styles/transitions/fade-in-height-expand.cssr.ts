import type { CNode } from 'css-render';
import { c } from '../../_utils';
import commonVariables from '../common/_common';

const { cubicBezierEaseInOut, cubicBezierEaseOut, cubicBezierEaseIn } = commonVariables;

interface FadeInHeightExpandTransitionOption {
  overflow?: string;
  duration?: string;
  originalTransition?: string;
  leavingDelay?: string;
  foldPadding?: boolean;
  enterToProps?: Record<string, string | number> | undefined;
  leaveToProps?: Record<string, string | number> | undefined;
  reverse?: boolean;
}

export const fadeInHeightExpandTransition = ({
  overflow = 'hidden',
  duration = '.3s',
  originalTransition = '',
  leavingDelay = '0s',
  foldPadding = false,
  enterToProps = undefined,
  leaveToProps = undefined,
  reverse = false,
}: FadeInHeightExpandTransitionOption = {}): CNode[] => {
  const enterClass = reverse ? 'exit' : 'enter';
  const leaveClass = reverse ? 'enter' : 'exit';
  return [
    c(`&.fade-in-height-expand-transition-${leaveClass}, &.fade-in-height-expand-transition-${enterClass}-done`, { ...enterToProps, opacity: 1 }),
    c(`&.fade-in-height-expand-transition-${leaveClass}-done, &.fade-in-height-expand-transition-${enterClass}`, {
      ...leaveToProps,
      opacity: 0,
      marginTop: '0 !important',
      marginBottom: '0 !important',
      paddingTop: foldPadding ? '0 !important' : undefined,
      paddingBottom: foldPadding ? '0 !important' : undefined,
    }),
    c(`&.fade-in-height-expand-transition-${leaveClass}-active`, {
      overflow: `${overflow}`,
      transition: `max-height ${duration} ${cubicBezierEaseInOut} ${leavingDelay}, opacity ${duration} ${cubicBezierEaseOut} ${leavingDelay}, margin-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay}, margin-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay}, padding-top ${duration} ${cubicBezierEaseInOut} ${leavingDelay}, padding-bottom ${duration} ${cubicBezierEaseInOut} ${leavingDelay} ${originalTransition ? ',' + originalTransition : ''}`,
    }),
    c(`&.fade-in-height-expand-transition-${enterClass}-active`, {
      overflow: `${overflow}`,
      transition: `max-height ${duration} ${cubicBezierEaseInOut}, opacity ${duration} ${cubicBezierEaseIn}, margin-top ${duration} ${cubicBezierEaseInOut}, margin-bottom ${duration} ${cubicBezierEaseInOut}, padding-top ${duration} ${cubicBezierEaseInOut}, padding-bottom ${duration} ${cubicBezierEaseInOut} ${originalTransition ? ',' + originalTransition : ''}`,
    }),
  ];
};
