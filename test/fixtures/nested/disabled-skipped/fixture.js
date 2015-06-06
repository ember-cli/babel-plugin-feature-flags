import isEnabled from 'features';

if (isEnabled('disabled')) {
  'a';
  if (isEnabled('skipped')) {
    'b';
  }
  'c';
}
