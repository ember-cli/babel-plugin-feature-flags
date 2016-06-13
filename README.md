# babel-plugin-feature-flags

[![Build Status](https://travis-ci.org/ember-cli/babel-plugin-feature-flags.svg?branch=master)](https://travis-ci.org/ember-cli/babel-plugin-feature-flags)

*This plugin is for Babel 6. If you need to support Babel 5 use the 0.2.x releases.*

A babel plugin that implements feature flags for enabling and disabling features. This plugin is intended to be followed by a dead code elimination pass (Uglify, babel-plugin-dead-code-elimination, etc.) to remove any unreachable code.

Feature flags are implemented by looking for call expressions like `isEnabled('my-feature')` and checking if the feature is enabled/disabled/disabled in a feature map that is passed through the plugin options. If the feature is known to be enabled or disabled then the call expression is replace with a boolean literal (`true` or `false` respectively). If the feature is dynamic, than the call expression is left alone.

## Example

Given the `.babelrc`

```json
{
  "plugins": [["feature-flags", {
    "import": {
        "module": "my-features"
    },
    "features": {
        "new-feature": "disabled"
    }
  }]]
}
```

the JavaScript file

```js
import isEnabled from 'my-features';

if (isEnabled('new-feature')) {
  // code
}
```

will be transformed to

```js
import isEnabled from 'my-features';

if (false) {
  // code
}
```

## Configuration

Here are the options that you can pass to the babel plugin.

- `options.import.module` [`String`]: The name of the module that the feature function is imported from.
- `options.import.name` [`String` (Optional)]: The name of the export that the feature function is imported from. Defaults to `"default"`.
- `options.features` [`Map(String -> 'enabled' | 'disabled' | 'dynamic')`]: An object whose keys are the names of features and whose values determine whether the feature is enabled/disabled/dynamic.
