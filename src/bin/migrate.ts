import { ServerConfig } from '../config';
import { SlonikMigrator } from '@slonik/migrator';
import { createPool } from 'slonik';

const { POSTGRES_CONNECTION_STRING } = ServerConfig;
if (!POSTGRES_CONNECTION_STRING) {
  throw new Error('Must provide a connection string!');
}
const slonik = createPool(POSTGRES_CONNECTION_STRING);

const migrator = new SlonikMigrator({
  logger: console,
  migrationsPath: __dirname + '/migrations',
  migrationTableName: 'migration',
  slonik,
});

migrator.runAsCLI();
