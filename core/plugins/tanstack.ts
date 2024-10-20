export default (moduleName: string) => {
  const root = moduleName || 'src';
  return {
    routesDirectory: `./${root}/pages`,
    generatedRouteTree: `./${root}/routeTree.gen.ts`,
    routeFileIgnorePrefix: '-',
    quoteStyle: 'single',
  };
};
