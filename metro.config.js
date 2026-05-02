const { getDefaultConfig } = require('expo/metro-config')
const { withStorybook } = require('@storybook/react-native/metro/withStorybook')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Add resolver configuration for AsyncStorage ES modules
config.resolver = {
  ...config.resolver,
  alias: {
    ...config.resolver.alias,
  },
  unstable_enablePackageExports: true,
}

module.exports = withStorybook(config)
