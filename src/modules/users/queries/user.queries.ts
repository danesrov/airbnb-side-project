import { USER_MUTATION } from './user.mutations';
import { USER_QUERY } from './user.query';

export const USER_QUERIES = {
  MUTATIONS: USER_MUTATION,
  QUERIES: USER_QUERY,
} as const;
