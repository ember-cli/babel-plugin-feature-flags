var stringify = require('json-stable-stringify');

module.exports = function(options) {
  options = options || {};
  options.features = options.features || {};
  options.import = options.import || {};
  options.import.name = options.import.name || 'default';

  if (typeof options.import.module !== 'string') {
    throw new Error("options.import.module must be the name of a module, e.g. 'my-app/features'");
  }

  Object.keys(options.features).forEach(function(feature) {
    var value = options.features[feature];

    if (typeof value === 'string') {
      if (value === 'enabled') {
        options.features[feature] = true;
      } else if (value === 'disabled') {
        options.features[feature] = false;
      } else if (value === 'dynamic') {
        options.features[feature] = null;
      } else {
        throw new Error("An unknown feature state '" + value + "' was detected for '" + feature + "'. Valid values are 'enabled', 'disabled' and 'dynamic'");
      }
    }
  });

  function babelPluginFeatureFlags(babel) {
    var t = babel.types;

    return new babel.Transformer('babel-plugin-feature-flags', {
      CallExpression: function(node, parent, scope, file) {
        var callee = this.get('callee');
        if (callee.referencesImport(options.import.module, options.import.name)) {
          var featureName = getFeatureName(node);
          if (featureName in options.features) {
            var value = options.features[featureName];

            if (typeof value === 'boolean') {
              this.replaceWith(t.literal(value));
            }
          } else {
            file.log.error("An unknown feature '" + featureName + "'' was encountered");
          }
        }
      }
    });
  }

  babelPluginFeatureFlags.baseDir = function() {
    return __dirname;
  };

  babelPluginFeatureFlags.cacheKey = function() {
    return stringify(options);
  };

  return babelPluginFeatureFlags;
};

function getFeatureName(callExpression) {
  var argument = callExpression.arguments[0];

  if (callExpression.arguments.length !== 1 || argument.type !== 'Literal' || typeof argument.value !== 'string') {
    file.log.error("Feature flag function should be called with a single string literal argument");
  }

  return argument.value;
}
