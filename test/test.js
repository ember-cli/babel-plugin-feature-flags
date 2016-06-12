var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var applyFeatureFlags = require('../index');

function testFixture(name, plugins) {
  it(name, function () {
    var fixturePath = path.resolve(__dirname, 'fixtures', name, 'fixture.js');
    var expectedPath = path.resolve(__dirname, 'fixtures', name, 'expected.js');

    var expected = fs.readFileSync(expectedPath).toString();
    var result = babel.transformFileSync(fixturePath, { plugins: plugins });

    assert.strictEqual(result.code + '\n', expected);
  });
}

describe('babel-plugin-feature-flags', function() {
  describe('basic', function() {
    var plugins = [
      [applyFeatureFlags, {
        import: {
          module: 'features'
        },
        features: {
          enabled: 'enabled',
          disabled: 'disabled',
          dynamic: 'dynamic'
        }
      }]
    ];

    testFixture('if/enabled', plugins);
    testFixture('if/disabled', plugins);
    testFixture('if/dynamic', plugins);
    testFixture('else/enabled', plugins);
    testFixture('else/disabled', plugins);
    testFixture('else/dynamic', plugins);
    testFixture('not-if/enabled', plugins);
    testFixture('not-if/disabled', plugins);
    testFixture('not-if/dynamic', plugins);
    testFixture('ternary/enabled', plugins);
    testFixture('ternary/disabled', plugins);
    testFixture('ternary/dynamic', plugins);
    testFixture('nested/enabled-enabled', plugins);
    testFixture('nested/enabled-disabled', plugins);
    testFixture('nested/enabled-dynamic', plugins);
    testFixture('nested/disabled-enabled', plugins);
    testFixture('nested/disabled-disabled', plugins);
    testFixture('nested/disabled-dynamic', plugins);
    testFixture('nested/dynamic-enabled', plugins);
    testFixture('nested/dynamic-disabled', plugins);
    testFixture('nested/dynamic-dynamic', plugins);
    testFixture('preserves-other-imports', plugins);
  });

  describe('multiple instances', function() {
    var plugins = [
      [applyFeatureFlags, {
        import: {
          module: 'features-one'
        },
        features: {
          enabledOne: 'enabled',
          disabledOne: 'disabled',
          dynamicOne: 'dynamic'
        }
      }],
      [applyFeatureFlags, {
        import: {
          module: 'features-two'
        },
        features: {
          enabledTwo: 'enabled',
          disabledTwo: 'disabled',
          dynamicTwo: 'dynamic'
        }
      }]
    ];

    testFixture('multiple-instances', plugins);
  });
});
