import isEnabled from 'features';

if (isEnabled('skipped')) {
  'enabled';
} else {
  'disabled';
}
