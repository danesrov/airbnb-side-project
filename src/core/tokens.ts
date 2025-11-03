import { DABATASE_CONST } from './db/tokens';
import { USER_TOKENS } from './users/tokens';
import { RESERVATION_TOKENS } from './reservations/tokens';
import { SEASON_TOKENS } from './seasons/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
  RESERVATION: RESERVATION_TOKENS,
  SEASON: SEASON_TOKENS,
} as const;
