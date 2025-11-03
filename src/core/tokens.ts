import { AMENITY_TOKENS } from './amenity/tokens';
import { DABATASE_CONST } from './db/tokens';
import { LISTINGS_TOKENS } from './listings/tokens';
import { USER_TOKENS } from './users/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
  AMENITY: AMENITY_TOKENS,
  LISTINGS: LISTINGS_TOKENS,
} as const;
