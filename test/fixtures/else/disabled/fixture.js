import isEnabled from 'features';

if (isEnabled('disabled')) {
  'enabled';
} else {
  'disabled';
}
