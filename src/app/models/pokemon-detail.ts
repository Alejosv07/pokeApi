export interface NameUrl {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
}

export interface PokemonAbility {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

export interface PokemonMove {
  move: NameUrl;
}




export class PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: PokemonSprites;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.height = data.height;
    this.weight = data.weight;

    this.abilities = data.abilities;
    this.stats = data.stats;
    this.moves = data.moves;
    this.sprites = data.sprites;
  }

  getFormattedWeight(): string {
    return `${(this.weight / 10).toFixed(2)} kg`;
  }
}