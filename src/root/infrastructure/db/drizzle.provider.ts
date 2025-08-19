import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schemas/index.schema';

export const DB_PROVIDER_TOKEN = 'drizzle-connection';

export const dbProvider: FactoryProvider = {
  provide: DB_PROVIDER_TOKEN,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    const pool = new Pool({
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false },
    });
    return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
  },
};
