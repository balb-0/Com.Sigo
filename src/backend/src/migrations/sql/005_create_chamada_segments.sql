-- Create table for semantically searchable segments of a chamada
CREATE TABLE IF NOT EXISTS chamada_segments (
  segment_id SERIAL PRIMARY KEY,
  chamada_id INTEGER NOT NULL REFERENCES chamada(chamada_id) ON DELETE CASCADE,
  speaker_tag INTEGER NOT NULL, -- 1=agente, 2=cliente (padronizado)
  start_time_ms INTEGER, -- opcional: milissegundos
  end_time_ms INTEGER,   -- opcional: milissegundos
  text TEXT NOT NULL,
  embedding vector(1536) -- text-embedding-3-small
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_chamada_segments_chamada_id ON chamada_segments(chamada_id);
CREATE INDEX IF NOT EXISTS idx_chamada_segments_speaker_tag ON chamada_segments(speaker_tag);

-- Vector similarity search index (HNSW is recommended; fallback to ivfflat if extension settings differ)
CREATE INDEX IF NOT EXISTS idx_chamada_segments_embedding_cosine
ON chamada_segments USING hnsw (embedding vector_cosine_ops);
