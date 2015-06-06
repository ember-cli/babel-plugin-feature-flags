import isEnabled from 'features';

if (isEnabled('enabled')) {
  'a';
  if (isEnabled('skipped')) {
    'b';
  }
  'c';
}
