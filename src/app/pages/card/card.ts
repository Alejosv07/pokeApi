import { Component, Input, input } from '@angular/core';
import { Typepokemon } from '../typepokemon/typepokemon';
import { PokemonDetail } from '../../models/pokemon-detail';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  imports: [Typepokemon, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})


export class Card {
  @Input() set pokemon(value: PokemonDetail) {
    this._pokemon = value;
    this.colors = this._pokemon.abilities.map((a, i) => {
      let hash = 0;
      for (let j = 0; j < a.ability.name.length; j++) {
        hash = a.ability.name.charCodeAt(j) + ((hash << 5) - hash);
      }
      return `hsl(${hash % 360}, 70%, 60%)`;
    });
  }
  get pokemon(): PokemonDetail {
    return this._pokemon!;
  }
  private _pokemon!: PokemonDetail;
  colors: string[] = [];

  getGradientBackground(): string {
    if (!this.colors || this.colors.length === 0) return '';
    return `linear-gradient(90deg, ${this.colors.join(', ')})`;
  }
}