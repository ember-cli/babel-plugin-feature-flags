import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'a';
  if (isEnabled('enabled')) {
    'b';
  }
  'c';
}
