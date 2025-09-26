import { Maybe } from '@ocr-platform/shared';

enum LocationType {
  Dn = 'dn',
  Hcm = 'hcm',
  Us = 'us',
  Ukraine = 'ukraine',
}

export function getUserLocation(locationType: Maybe<LocationType>) {
  if (!locationType) return '';

  const LOCATION = {
    [LocationType.Dn]: 'Da Nang',
    [LocationType.Hcm]: 'Ho Chi Minh',
    [LocationType.Us]: 'US',
    [LocationType.Ukraine]: 'Ukraine',
  };

  return LOCATION[locationType];
}
