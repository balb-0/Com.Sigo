export type TagType = 'positivo' | 'negativo' | 'neutro';

export interface Tag {
    name: string;
    type: TagType;
}

export interface Chamada {
    id: string;
    dataHora: string;
    pontuacao: number; 
    tags: Tag[];
}