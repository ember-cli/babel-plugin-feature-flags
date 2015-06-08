import isEnabled from 'features';

if (isEnabled('enabled')) {
  'a';
  if (isEnabled('dynamic')) {
    'b';
  }
  'c';
}
