import * as schema from 'src/db/user.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DatabaseService = NodePgDatabase<typeof schema>;