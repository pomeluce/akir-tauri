import { unocss } from '@common/plugins';
import { setup as hotkeys } from './hotkeys';

const modules = [hotkeys, unocss];

export default () => {
  modules.map(module => module());
};

export { default as router } from './router';
export * from './sqlx';
