// src/listings/queries/listing.queries.ts
import { LISTING_MUTATION } from './listing.mutations';
import { LISTING_QUERY } from './listing.query';

export const LISTING_QUERIES = {
  MUTATIONS: LISTING_MUTATION,
  QUERIES: LISTING_QUERY,
} as const;
