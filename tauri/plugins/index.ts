import { setup as hotkeys } from './hotkeys';
import { setup as unocss } from './unocss';

const modules = [hotkeys, unocss];

export default () => {
  modules.map(module => module());
};

export { default as router } from './router';
export * from './sqlx';
