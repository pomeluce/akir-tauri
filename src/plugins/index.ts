import { unocss } from '@common/plugins';

const modules = [unocss];

export default () => {
  modules.map(module => module());
};

export { default as http } from './axios';
export { default as router } from './router';
