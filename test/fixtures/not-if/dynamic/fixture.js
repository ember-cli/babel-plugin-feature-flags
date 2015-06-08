import isEnabled from 'features';

if (!isEnabled('dynamic')) {
  'disabled';
}
