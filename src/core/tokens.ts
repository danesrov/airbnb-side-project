import { DABATASE_CONST } from './db/tokens';
import { USER_TOKENS } from './users/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
} as const;
