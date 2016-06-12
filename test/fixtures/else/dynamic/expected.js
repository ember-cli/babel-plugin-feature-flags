import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'enabled';
} else {
  'disabled';
}
