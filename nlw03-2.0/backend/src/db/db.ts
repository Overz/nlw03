import fs from 'fs';
import { Connection } from 'typeorm';
import umzug, { Storage } from 'umzug';

class TypeOrmStorage implements Storage {
  checked: boolean;

  constructor(public db: Connection) {
    this.checked = false;
  }

  async checkTable() {
    if (this.checked) {
      return;
    }

    await this.db.query(
      'CREATE TABLE IF NOT EXISTS migrations (name TEXT NOT NULL PRIMARY KEY)'
    );
    this.checked = true;
  }

  async logMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query('INSERT INTO migrations (name) values ($1)', [
      migrationName,
    ]);
  }

  async unlogMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query('DELETE FROM migrations WHERE name = $1', [
      migrationName,
    ]);
  }

  async executed() {
    await this.checkTable();

    const rows: { name: string }[] = await this.db.query(
      'SELECT name FROM migrations ORDER BY name'
    );

    return rows.map((row) => row.name);
  }
}

export const migrate = async (db: Connection, migrationPath: string) => {
  const u = new umzug({
    migrations: {
      path: migrationPath,
      pattern: /^\d+[\w-]+\.sql$/,
      customResolver: (sqlPath) => {
        return {
          up: async () => {
            console.log('[Migration] Processing path:', sqlPath);

            const commands = fs.readFileSync(sqlPath, 'utf8').split(';');
            await db.manager.transaction(async (manager) => {
              for (let i = 0; i < commands.length; i++) {
                const sql = commands[i].trim();

                if (!sql) {
                  continue;
                }

                await manager.query(sql);
              }
            });
          },
        };
      },
    },
    storage: new TypeOrmStorage(db),
  });

  console.log('[Migration] Starting...');
  await u.up();
  console.log('[Migration] DB schema updated.');
};
