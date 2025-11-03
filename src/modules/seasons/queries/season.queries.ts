import { SEASON_MUTATION } from './season.mutations';
import { SEASON_QUERY } from './season.query';

export const SEASON_QUERIES = {
  MUTATIONS: SEASON_MUTATION,
  QUERIES: SEASON_QUERY,
} as const;
