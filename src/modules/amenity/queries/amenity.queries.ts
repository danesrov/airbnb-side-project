import { AMENITY_MUTATION } from './amenity.mutations';
import { AMENITY_QUERY } from './amenity.query';

export const AMENITY_QUERIES = {
  MUTATIONS: AMENITY_MUTATION,
  QUERIES: AMENITY_QUERY,
} as const;
