import { CachingTypes } from '../constants/cachingTypes';

// check for non typescript projects using this library
export function cachingTypeChecker(cachingType: CachingTypes): void {
  if (
    cachingType !== CachingTypes.CacheFirst &&
    cachingType !== CachingTypes.CacheAndNetwork &&
    cachingType !== CachingTypes.NetworkOnly &&
    cachingType !== CachingTypes.CacheOnly &&
    cachingType !== CachingTypes.NoCache
  ) {
    throw new Error('cachingType option is not valid!');
  }
}
