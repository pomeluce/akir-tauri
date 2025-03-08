import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import plugins from '@/plugins';

const bootstrap = (): void => {
  // 创建 react 实例
  const app = createRoot(document.querySelector('#root')!);
  // 挂载插件
  plugins();
  // 挂载到 app 中
  app.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

bootstrap();
