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
    if (value !== true && value !== false && value !== 'skip') {
      throw new Error("Each feature in options.features must have a value of `true`, `false` or `skip`.");
    }
  });

  return function(babel) {
    var importDeclarations;
    var removeImportDeclarations;

    function acceptFeatureCall(callExpression, ifStatement, invert, file) {
      var callee = callExpression.get('callee');

      if (callee.referencesImport(options.import.module, options.import.name)) {
        var feature = callExpression.node.arguments[0].value;

        if (feature in options.features) {
          var value = options.features[feature];

          if (value === 'skip') {
            // Do nothing
          } else if (value === !invert) {
            var consequent = ifStatement.node.consequent;
            ifStatement.replaceWithMultiple(consequent.body);
          } else if (value === !!invert) {
            var alternate = ifStatement.node.alternate;
            if (alternate) {
              ifStatement.replaceWithMultiple(alternate.body);
            } else {
              ifStatement.dangerouslyRemove();
            }
          }
        } else {
          file.log.warn("An unknown feature '" + feature + "'' was encountered and removed")
        }
      }
    }

    return new babel.Transformer('babel-plugin-feature-flags', {
      IfStatement: function(node, parent, scope, file) {
        var test = this.get('test');
        if (test.isUnaryExpression() && test.node.operator === '!') {
          var argument = test.get('argument');
          if (argument.isCallExpression()) {
            acceptFeatureCall(argument, this, true, file);
          }
        } else if (test.isCallExpression()) {
          acceptFeatureCall(test, this, false, file);          
        }
      }
    });
  };
};
