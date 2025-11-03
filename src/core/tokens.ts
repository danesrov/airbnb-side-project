import { DABATASE_CONST } from './db/tokens';
import { HOSTS_TOKENS } from './host/tokens';
import { USER_TOKENS } from './users/tokens';

export const TOKENS = {
  DB_TOKENS: DABATASE_CONST,
  USER: USER_TOKENS,
  HOSTS: HOSTS_TOKENS,
} as const;
