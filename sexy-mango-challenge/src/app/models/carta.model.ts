export type Intensidad = 'suave' | 'picante' | 'extremo';
export type Categoria = 'verdad' | 'reto';

export interface Carta {
  id: string;
  categoria: Categoria;
  intensidad: Intensidad;
  texto: string;
}

export interface CartasData {
  verdades: Carta[];
  retos: Carta[];
}
