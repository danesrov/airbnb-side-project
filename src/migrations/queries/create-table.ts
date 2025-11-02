export const MIGRATION_QUERIES = {
  CREATE_CONTROL_TABLE: `
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      executed_at TIMESTAMP NOT NULL DEFAULT now()
    )
  `,
} as const;
