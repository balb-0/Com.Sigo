import fs from "fs";
import path from "path";
import { chamadaRepository } from "../repositories/chamada.repository";
import { getDb } from "../config/db";

type ConversationJson = {
  results?: Array<{
    alternatives?: Array<{
      transcript?: string;
      confidence?: number;
      words?: Array<any>;
    }>;
    channelTag?: number;
  }>;
  totalBilledTime?: string;
  meta?: {
    scenario?: string;
    persona?: string;
    seed?: number | string;
    [key: string]: any;
  };
  [key: string]: any;
};

async function main(): Promise<void> {
  const pool = getDb();
  const baseDir = path.resolve(__dirname, "../../../scripts/GenerateConversations/results");

  // Always start from a clean slate
  await pool.query("TRUNCATE TABLE chamada RESTART IDENTITY");
  console.log("Cleared table 'chamada'.");

  const files = fs
    .readdirSync(baseDir)
    .filter((f) => f.toLowerCase().endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.log("No JSON files found to seed.");
    await pool.end();
    return;
  }

  const atendenteIds = ["1", "2", "3", "4"] as const;
  let atendenteIndex = 0;

  let inserted = 0;
  let clienteIndex = 0;

  for (const fileName of files) {
    try {
      const fullPath = path.join(baseDir, fileName);
      const raw = fs.readFileSync(fullPath, "utf8");
      const json: ConversationJson = JSON.parse(raw);

      const clienteId = String(clienteIndex + 1);

      const atendenteId: string = atendenteIds[atendenteIndex % atendenteIds.length] as string;
      atendenteIndex = (atendenteIndex + 1) % atendenteIds.length;

      await chamadaRepository.create({
        cliente_id: clienteId,
        atendente_id: atendenteId,
        transcript_json: json,
      });

      inserted += 1;
      clienteIndex += 1;
    } catch (err) {
      console.error(`Failed to process ${fileName}:`, err);
    }
  }

  console.log(
    `Seed complete. Inserted ${inserted} chamadas.`
  );

  await pool.end();
}

main().catch(async (err) => {
  console.error("Seed failed:", err);
  const pool = getDb();
  await pool.end();
  process.exit(1);
});
