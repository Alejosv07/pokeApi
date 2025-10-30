import { Component, HostListener, ViewChild } from '@angular/core';
import { Card } from '../card/card';
import { Searchpokemon } from '../searchpokemon/searchpokemon';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Loading } from '../utils/loading/loading';
import { PokemonResultService } from '../../services/pokemon-result-service';
import { PokemonDetail } from '../../models/pokemon-detail';
import { finalize, forkJoin, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WelcomePage } from '../welcome-page/welcome-page';

@Component({
  selector: 'app-home',
  imports: [Card, Searchpokemon, Header, Footer, Loading, CommonModule, WelcomePage],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //Resultado del paginador
  public pokemonResultItem: PokemonDetail[] = [];
  limit: number = 20;
  offset: number = 0;
  loading: boolean = false;
  allLoaded: boolean = false;

  constructor(private pokemonresult: PokemonResultService) {}

  ngOnInit() {
      this.loadPokemon();
  }

  searchPokemon(pokemonDetail: PokemonDetail) {
    this.pokemonResultItem.length = 0;
    console.log(pokemonDetail);
    this.pokemonResultItem.push(pokemonDetail);
  }

  public loadFirst() {
    this.pokemonResultItem = [];
    this.limit = 20;
    this.offset = 0;
    this.loading = false;
    this.allLoaded = false;
    this.loadPokemon();
  }

  private loadPokemon(): void {
    if (this.allLoaded || this.loading) {
      return;
    }

    this.loading = true;

    this.pokemonresult
      .findAll(this.limit, this.offset)
      .pipe(
        switchMap((data) => {
          this.allLoaded = !data.next;
          const detail = data.results.map((urls) => {
            return this.pokemonresult.getPokemonDetail(urls.url).pipe(
              map((pokemon: PokemonDetail) => {
                return new PokemonDetail(pokemon);
              })
            );
          });

          return forkJoin(detail);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.offset += this.limit;
          this.pokemonResultItem.push(...data);
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const mainElement = document.querySelector('.main') as HTMLElement | null;

    if (mainElement === null) {
      return;
    }
    if (window.innerHeight + window.scrollY >= mainElement.offsetHeight) {
      this.loadPokemon();
    }
  }
}
