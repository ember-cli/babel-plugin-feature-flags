import isEnabled from 'features';

if (isEnabled('enabled')) {
  'a';
  if (isEnabled('enabled')) {
    'b';
  }
  'c';
}
