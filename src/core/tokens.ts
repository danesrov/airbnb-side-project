import { DABATASE_CONST } from './db/tokens';
import { USER_TOKENS } from './users/tokens';
import { RESERVATION_TOKENS } from './reservations/tokens';
import { SEASON_TOKENS } from './seasons/tokens';
import { ZONE_TOKENS } from './zones/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
  RESERVATION: RESERVATION_TOKENS,
  SEASON: SEASON_TOKENS,
  ZONE: ZONE_TOKENS,
} as const;
