import { viteMockServe } from 'vite-plugin-mock';

export default (isBuild: boolean, env: ImportMetaEnv) => {
  return viteMockServe({ mockPath: 'core/mock', enable: !isBuild && env.VITE_MOCK_ENABLE });
};
