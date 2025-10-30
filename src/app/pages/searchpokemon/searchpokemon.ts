import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonResultService } from '../../services/pokemon-result-service';
import { PokemonDetail } from '../../models/pokemon-detail';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-searchpokemon',
  imports: [],
  templateUrl: './searchpokemon.html',
  styleUrl: './searchpokemon.css',
})
export class Searchpokemon {
  constructor(private pokemonService: PokemonResultService) {}
  @Output() searchEvent = new EventEmitter<PokemonDetail>();
  @Output() searchEventAll = new EventEmitter();

  search(text: string) {
    if (text.trim().length === 0 || text.trim() === null) {
      this.searchEventAll.emit();
      return;
    }

    this.pokemonService.getPokemonDetail('https://pokeapi.co/api/v2/pokemon/' + text).subscribe({
      next: (pokemon) => this.searchEvent.emit(pokemon),
      error: (err) => {
        console.log(err);
        const notyf = new Notyf({
          position: {
            x: 'right',
            y: 'top',
          },
        });
        notyf.error('¡Pokémon no encontrado!');
      },
    });
  }
}
