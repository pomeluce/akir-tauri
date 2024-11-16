import { setup as unocss } from './unocss';
import { setup as hotkeys } from './hotkeys';

const modules = [hotkeys, unocss];

export default () => {
  modules.map(module => module());
};

export { router } from './router';
export { default as yup } from './yup';
