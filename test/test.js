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

describe('babel-feature-flags', function() {
  var options = {
    import: {
      module: 'features'
    },
    features: {
      enabled: true,
      disabled: false,
      skipped: 'skip'
    }
  }

  testFixture('if/enabled', options);
  testFixture('if/disabled', options);
  testFixture('if/skipped', options);
  testFixture('else/enabled', options);
  testFixture('else/disabled', options);
  testFixture('else/skipped', options);
  testFixture('not-if/enabled', options);
  testFixture('not-if/disabled', options);
  testFixture('not-if/skipped', options);
  testFixture('nested/enabled-enabled', options);
  testFixture('nested/enabled-disabled', options);
  testFixture('nested/enabled-skipped', options);
  testFixture('nested/disabled-enabled', options);
  testFixture('nested/disabled-disabled', options);
  testFixture('nested/disabled-skipped', options);
  testFixture('nested/skipped-enabled', options);
  testFixture('nested/skipped-disabled', options);
  testFixture('nested/skipped-skipped', options);
});
