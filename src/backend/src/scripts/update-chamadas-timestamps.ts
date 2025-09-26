import { getDb } from "../config/db";

/**
 * Update existing chamada rows' created_at timestamps so they are distributed over a time range.
 *
 * Usage (from backend/):
 *   npx ts-node-dev --transpile-only src/scripts/update-chamadas-timestamps.ts --days 120 --start now
 *   npx ts-node-dev --transpile-only src/scripts/update-chamadas-timestamps.ts --from 2025-01-01 --to 2025-09-01
 *
 * Options:
 *   --days <N>     Number of days back from "now" as the range length (default 120)
 *   --start <S>    Range end moment. "now" or ISO datetime (default now)
 *   --from <ISO>   Explicit range start (overrides --days)
 *   --to <ISO>     Explicit range end (overrides --start)
 *   --order <asc|desc>  Assign oldest to newest in id order (default asc)
 */
async function main(): Promise<void> {
  const pool = getDb();
  try {
    const args = process.argv.slice(2);
    const argMap = new Map<string, string>();
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];
      if (key && value && key.startsWith("--")) {
        argMap.set(key.substring(2), value);
      }
    }

    const order = (argMap.get("order") || "asc").toLowerCase() === "desc" ? "desc" : "asc";

    const fromArg = argMap.get("from");
    const toArg = argMap.get("to");
    const startArg = argMap.get("start") || "now";
    const daysArg = parseInt(argMap.get("days") || "120", 10);

    let rangeStart: Date;
    let rangeEnd: Date;

    if (fromArg || toArg) {
      if (!fromArg || !toArg) {
        throw new Error("When using --from/--to, both must be provided as ISO datetimes.");
      }
      rangeStart = new Date(fromArg);
      rangeEnd = new Date(toArg);
    } else {
      const end = startArg === "now" ? new Date() : new Date(startArg);
      const start = new Date(end.getTime() - daysArg * 24 * 60 * 60 * 1000);
      rangeStart = start;
      rangeEnd = end;
    }

    if (isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
      throw new Error("Invalid date arguments for range start or end.");
    }
    if (rangeStart >= rangeEnd) {
      throw new Error("Range start must be before range end.");
    }

    // Gather IDs we will update
    const idsResult = await pool.query(`SELECT chamada_id FROM chamada ORDER BY chamada_id ${order}`);
    const ids: number[] = idsResult.rows.map((r: any) => Number(r.chamada_id));

    if (ids.length === 0) {
      console.log("No chamadas to update.");
      return;
    }

    const total = ids.length;
    const startMs = rangeStart.getTime();
    const endMs = rangeEnd.getTime();
    const spanMs = endMs - startMs;

    // Compute even spacing across range. For N items, we place them at N positions inclusive of bounds.
    // If only 1 item, place at the middle of the range.
    const timestamps: number[] = [];
    if (total === 1) {
      timestamps.push(startMs + Math.floor(spanMs / 2));
    } else {
      for (let i = 0; i < total; i++) {
        const ratio = i / (total - 1);
        timestamps.push(Math.floor(startMs + ratio * spanMs));
      }
    }

    // Update in a single transaction for safety
    await pool.query("BEGIN");
    for (let i = 0; i < total; i++) {
      const id = ids[i];
      const ts = new Date(timestamps[i]);
      await pool.query("UPDATE chamada SET created_at = $1 WHERE chamada_id = $2", [ts.toISOString(), id]);
    }
    await pool.query("COMMIT");

    console.log(`Updated ${total} chamadas created_at from ${rangeStart.toISOString()} to ${rangeEnd.toISOString()} in ${order} id order.`);
  } catch (err) {
    console.error("Failed to update chamadas timestamps:", err);
    try {
      await getDb().query("ROLLBACK");
    } catch {}
    process.exitCode = 1;
  } finally {
    await getDb().end();
  }
}

main();
