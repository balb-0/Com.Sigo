import 'dotenv/config';
import { OpenAI } from "openai";

export function createOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY not set. Add it to .env or your environment.");
  }
  return new OpenAI({ apiKey });
}

export function resolveModel(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}
