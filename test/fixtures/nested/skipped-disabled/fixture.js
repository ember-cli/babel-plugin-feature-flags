import isEnabled from 'features';

if (isEnabled('skipped')) {
  'a';
  if (isEnabled('disabled')) {
    'b';
  }
  'c';
}
