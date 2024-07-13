import { setup as hotkeys } from './hotkeys';

const modules = [hotkeys];

export default () => {
  modules.map(module => module());
};

export { default as router } from './router';
