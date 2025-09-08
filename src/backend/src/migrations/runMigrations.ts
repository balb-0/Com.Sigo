import { Pool } from "pg";
import { loadEnv } from "../config/env";
import fs from "fs";
import path from "path";

async function runMigrations() {
  const env = loadEnv();
  const pool = new Pool({ connectionString: env.DATABASE_URL });

  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get list of migration files
    const migrationsDir = path.join(__dirname, "sql");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    // Check which migrations have already been run
    const { rows: executedMigrations } = await pool.query(
      "SELECT filename FROM migrations ORDER BY id"
    );
    const executedFilenames = executedMigrations.map((row) => row.filename);

    // Run pending migrations
    for (const filename of migrationFiles) {
      if (!executedFilenames.includes(filename)) {
        console.log(`Running migration: ${filename}`);

        const migrationPath = path.join(migrationsDir, filename);
        const migrationSQL = fs.readFileSync(migrationPath, "utf8");

        await pool.query("BEGIN");
        try {
          await pool.query(migrationSQL);
          await pool.query("INSERT INTO migrations (filename) VALUES ($1)", [
            filename,
          ]);
          await pool.query("COMMIT");
          console.log(`✓ Migration ${filename} completed`);
        } catch (error) {
          await pool.query("ROLLBACK");
          throw error;
        }
      } else {
        console.log(`✓ Migration ${filename} already executed`);
      }
    }

    console.log("All migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigrations();
}

export { runMigrations };
