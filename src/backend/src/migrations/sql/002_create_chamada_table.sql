-- Create chamada table to store call records with embeddings
CREATE TABLE IF NOT EXISTS chamada (
    chamada_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cliente_id VARCHAR(255),
    atendente_id VARCHAR(255),
    avaliacao_json JSONB,
    nota_qualidade INTEGER CHECK (nota_qualidade >= 1 AND nota_qualidade <= 5),
    transcript_json JSONB,
    embedding vector(1536) -- Vector field for semantic search
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chamada_created_at ON chamada(created_at);
CREATE INDEX IF NOT EXISTS idx_chamada_cliente_id ON chamada(cliente_id);
CREATE INDEX IF NOT EXISTS idx_chamada_atendente_id ON chamada(atendente_id);
CREATE INDEX IF NOT EXISTS idx_chamada_nota_qualidade ON chamada(nota_qualidade);

-- Create vector similarity search index using HNSW algorithm
CREATE INDEX IF NOT EXISTS idx_chamada_embedding_cosine 
ON chamada USING hnsw (embedding vector_cosine_ops) 
WHERE embedding IS NOT NULL;
