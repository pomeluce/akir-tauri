import { vitePluginForArco } from '@arco-plugins/vite-react';

export default () =>
  vitePluginForArco({
    modifyVars: {
      'green-1': '#E8FFEF',
      'green-2': '#B3ECC6',
      'green-3': '#84D9A3',
      'green-4': '#5AC685',
      'green-5': '#36B36C',
      'green-6': '#18A058',
      'green-7': '#108B4D',
      'green-8': '#097643',
      'green-9': '#046139',
      'green-10': '#004D2E',
    },
    style: true,
  });
