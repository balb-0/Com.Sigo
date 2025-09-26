-- Drop nota_qualidade check constraint to allow 1-10 or other ranges controlled by app logic
ALTER TABLE chamada DROP CONSTRAINT IF EXISTS chamada_nota_qualidade_check;
