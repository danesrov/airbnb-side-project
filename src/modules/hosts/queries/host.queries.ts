import { HOST_MUTATION } from './host.mutations';
import { HOST_QUERY } from './host.query';

export const HOST_QUERIES = {
  MUTATIONS: HOST_MUTATION,
  QUERIES: HOST_QUERY,
} as const;