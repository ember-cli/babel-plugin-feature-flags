import isEnabled from 'features';

if (isEnabled('disabled')) {
  'a';
  if (isEnabled('enabled')) {
    'b';
  }
  'c';
}
