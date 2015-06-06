import isEnabled from 'features';

if (isEnabled('enabled')) {
  'a';
  if (isEnabled('disabled')) {
    'b';
  }
  'c';
}
