import isEnabled from 'features';

if (isEnabled('skipped')) {
  'a';
  if (isEnabled('enabled')) {
    'b';
  }
  'c';
}