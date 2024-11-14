import { build } from 'vite';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';

const root = process.cwd();

const entryPath = resolve(root, './modules');
const entrys = Object.fromEntries(readdirSync(entryPath).map(dirname => [dirname, join(entryPath, dirname)]));

const builds = async mode => {
  Object.keys(entrys).forEach(async name => {
    console.log(`module ${name} build start, the mode is ${mode}`);
    await build({
      configFile: './vite.config.ts',
      mode,
      root: `./modules/${name}/`,
      publicDir: `${root}/public`,
      build: {
        outDir: `${root}/dist/${name}`,
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(root, `modules/${name}/index.html`),
        },
      },
    });
    console.log(`module ${name} build end!`);
  });
};

const mode = process.argv[2] || 'production';
builds(mode);
