import { Component, Input } from '@angular/core';
import { PokemonAbility } from '../../models/pokemon-detail';

@Component({
  selector: 'app-typepokemon',
  imports: [],
  templateUrl: './typepokemon.html',
  styleUrl: './typepokemon.css',
})
export class Typepokemon {
  @Input() abilityName!: PokemonAbility;

  getAbilityColor(): string {
    let hash = 0;
    for (let i = 0; i < this.abilityName.ability.name.length; i++) {
      hash = this.abilityName.ability.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
  }
}
