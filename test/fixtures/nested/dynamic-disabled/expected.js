import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'a';
  if (false) {
    'b';
  }
  'c';
}
