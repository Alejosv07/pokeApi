import { PokemonResultItem } from "./pokemon-result-item";

export interface PokemonResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResultItem[];
}
