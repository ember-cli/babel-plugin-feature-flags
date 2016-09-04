import isEnabled from 'features';
import { isFeatureEnabled } from 'other-features';

if (isEnabled('enabled')) {
  '1. enabled';
}

if (isFeatureEnabled('enabled')) {
  '2. enabled';
}
