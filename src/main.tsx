import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import 'virtual:uno.css';
import '@/styles/index.scss';

const bootstrap = (): void => {
  // 创建 react 实例
  const app = createRoot(document.querySelector('#root')!);
  // 挂载到 app 中
  app.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

bootstrap();
