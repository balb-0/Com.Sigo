-- Drop embedding column and related index from chamada
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'idx_chamada_embedding_cosine'
  ) THEN
    EXECUTE 'DROP INDEX IF EXISTS idx_chamada_embedding_cosine';
  END IF;
END $$;

ALTER TABLE chamada
  DROP COLUMN IF EXISTS embedding;
