module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable source map loader for problematic modules
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.loader && rule.loader.includes('source-map-loader')) {
          rule.exclude = /node_modules/;
        }
        return rule;
      });
      // Add alias for React Native Async Storage
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@react-native-async-storage/async-storage': false,
      };
      return webpackConfig;
    },
  },
};