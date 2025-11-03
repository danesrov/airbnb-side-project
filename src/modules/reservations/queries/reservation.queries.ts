import { RESERVATION_MUTATION } from './reservation.mutations';
import { RESERVATION_QUERY } from './reservation.query';

export const RESERVATION_QUERIES = {
  MUTATIONS: RESERVATION_MUTATION,
  QUERIES: RESERVATION_QUERY,
} as const;
