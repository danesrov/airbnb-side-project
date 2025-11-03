import { AMENITY_TOKENS } from './amenity/tokens';
import { DABATASE_CONST } from './db/tokens';
import { LISTINGS_TOKENS } from './listings/tokens';
import { HOSTS_TOKENS } from './host/tokens';
import { USER_TOKENS } from './users/tokens';
import { RESERVATION_TOKENS } from './reservations/tokens';
import { SEASON_TOKENS } from './seasons/tokens';
import { ZONE_TOKENS } from './zones/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
  AMENITY: AMENITY_TOKENS,
  LISTINGS: LISTINGS_TOKENS,
  HOSTS: HOSTS_TOKENS,
  RESERVATION: RESERVATION_TOKENS,
  SEASON: SEASON_TOKENS,
  ZONE: ZONE_TOKENS,
} as const;
