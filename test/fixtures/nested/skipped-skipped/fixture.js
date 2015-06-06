import isEnabled from 'features';

if (isEnabled('skipped')) {
  'a';
  if (isEnabled('skipped')) {
    'b';
  }
  'c';
}
