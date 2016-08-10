var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var applyFeatureFlags = require('../index');

function testFixture(name, options) {
  it(name, function () {
    var fixturePath = path.resolve(__dirname, 'fixtures', name, 'fixture.js');
    var expectedPath = path.resolve(__dirname, 'fixtures', name, 'expected.js');

    var expected = fs.readFileSync(expectedPath).toString();
    var result = babel.transformFileSync(fixturePath, {
      plugins: [ applyFeatureFlags(options) ]
    });

    assert.strictEqual(result.code, expected);
  });
}

describe('babel-plugin-feature-flags', function() {
  var options = {
    import: {
      module: 'features'
    },
    features: {
      enabled: 'enabled',
      disabled: 'disabled',
      dynamic: 'dynamic'
    }
  };

  testFixture('if/enabled', options);
  testFixture('if/disabled', options);
  testFixture('if/dynamic', options);
  testFixture('else/enabled', options);
  testFixture('else/disabled', options);
  testFixture('else/dynamic', options);
  testFixture('not-if/enabled', options);
  testFixture('not-if/disabled', options);
  testFixture('not-if/dynamic', options);
  testFixture('ternary/enabled', options);
  testFixture('ternary/disabled', options);
  testFixture('ternary/dynamic', options);
  testFixture('nested/enabled-enabled', options);
  testFixture('nested/enabled-disabled', options);
  testFixture('nested/enabled-dynamic', options);
  testFixture('nested/disabled-enabled', options);
  testFixture('nested/disabled-disabled', options);
  testFixture('nested/disabled-dynamic', options);
  testFixture('nested/dynamic-enabled', options);
  testFixture('nested/dynamic-disabled', options);
  testFixture('nested/dynamic-dynamic', options);
  testFixture('preserves-other-imports', options);

  it('provides a baseDir', function() {
    var expectedPath = path.join(__dirname, '..');

    var featureFlagInstance = applyFeatureFlags({
      import: {
        module: 'features'
      }
    });

    assert.equal(featureFlagInstance.baseDir(), expectedPath);
  });

  it('includes options in `cacheKey`', function() {
    var first = applyFeatureFlags({
      import: {
        module: 'features'
      },
      features: {
        foo: 'enabled',
        bar: 'disabled'
      }
    });

    var second = applyFeatureFlags({
      import: {
        module: 'features'
      },
      features: {
        foo: 'enabled',
        bar: 'dynamic'
      }
    });

    assert.notEqual(first.cacheKey(), second.cacheKey());
  });
});
