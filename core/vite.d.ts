/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ENV: string;
  VITE_BASE_PREFIX: string;
  VITE_API_URL: string;
  VITE_MOCK_ENABLE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
