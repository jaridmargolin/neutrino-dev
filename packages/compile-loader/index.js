const babelMerge = require('babel-merge');

module.exports = (neutrino, options = {}) => neutrino.config.module
  .rule(options.ruleId || 'compile')
    .test(options.test || neutrino.regexFromExtensions())
    .when(options.include, rule => rule.include.merge(options.include))
    .when(options.exclude, rule => rule.exclude.merge(options.exclude))
    .use(options.useId || 'babel')
      .loader(require.resolve('babel-loader'))
      .options({
        cacheDirectory: true,
        babelrc: false,
        ...(options.babel || {})
      });

module.exports.merge = babelMerge;
