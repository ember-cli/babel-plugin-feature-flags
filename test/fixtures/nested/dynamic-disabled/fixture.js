import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'a';
  if (isEnabled('disabled')) {
    'b';
  }
  'c';
}
