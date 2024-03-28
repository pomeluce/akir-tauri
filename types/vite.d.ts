/// <reference types="vite/client" />

interface ImportMetaEnv {
  NODE_ENV: string;
  VITE_BASE_PREFIX: string;
  VITE_API_URL: string;
  VITE_MOCK_ENABLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __DEV__: boolean;
declare const process: {
  env: {
    NODE_ENV: string;
  };
};
