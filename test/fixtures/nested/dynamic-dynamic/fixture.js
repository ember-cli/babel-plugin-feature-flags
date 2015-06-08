import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'a';
  if (isEnabled('dynamic')) {
    'b';
  }
  'c';
}
