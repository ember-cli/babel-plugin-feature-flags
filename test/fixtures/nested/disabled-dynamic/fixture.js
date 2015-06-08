import isEnabled from 'features';

if (isEnabled('disabled')) {
  'a';
  if (isEnabled('dynamic')) {
    'b';
  }
  'c';
}
