import isEnabled from 'features';

if (true) {
  'a';
  if (isEnabled('dynamic')) {
    'b';
  }
  'c';
}
