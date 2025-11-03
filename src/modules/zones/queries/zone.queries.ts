import { ZONE_MUTATION } from './zone.mutations';
import { ZONE_QUERY } from './zone.query';

export const ZONE_QUERIES = {
  MUTATIONS: ZONE_MUTATION,
  QUERIES: ZONE_QUERY,
} as const;
