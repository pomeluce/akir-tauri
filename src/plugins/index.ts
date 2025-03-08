import { setup as tailwind } from './tailwind';
import { setup as hotkeys } from './hotkeys';

const modules = [hotkeys, tailwind];

export default () => {
  modules.map(module => module());
};

export { router } from './router';
export { default as yup } from './yup';
