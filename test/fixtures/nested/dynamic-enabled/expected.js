import isEnabled from 'features';

if (isEnabled('dynamic')) {
  'a';
  if (true) {
    'b';
  }
  'c';
}
