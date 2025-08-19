import * as schema from 'src/root/infrastructure/schemas/index.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DatabaseService = NodePgDatabase<typeof schema>;