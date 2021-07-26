/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          // FIXES https://github.com/snowpackjs/snowpack/discussions/2810
          config.module.rules.find(
            (rule) =>
              rule &&
              rule.use &&
              rule.use.find((use) => {
                if (
                  !use ||
                  !use.loader ||
                  !use.loader.includes('babel-loader')
                ) {
                  return null;
                }

                use.options.plugins = (use.options.plugins || []).concat([
                  '@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'
                ]);

                return use;
              }),
          );
          return config;
        },
      },
    ],
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    'snowpack-svgr-plugin',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    { "match": "routes", "src": ".*", "dest": "/index.html" },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    hmr: false,
    port: 2000,
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    "~": "./src",
  }
};
