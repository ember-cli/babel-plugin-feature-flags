import isEnabled from 'features';

if (isEnabled('disabled')) {
  'a';
  if (isEnabled('disabled')) {
    'b';
  }
  'c';
}
