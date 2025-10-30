import { Component, ElementRef, ViewChild } from '@angular/core';
import { Threejs } from "../utils/threejs/threejs";
import { PokemonResultService } from '../../services/pokemon-result-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon-detail';
import { Typepokemon } from "../typepokemon/typepokemon";
import { MatTabsModule } from '@angular/material/tabs';
import { Footer } from "../footer/footer";
@Component({
  selector: 'app-pokemon-detail',
  imports: [Threejs, RouterLink, Typepokemon, MatTabsModule, Footer],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetailComponent{
  pokemonSent?: PokemonDetail;
  fullscreenSent = false; 
  @ViewChild("threeComponent") threejs!: Threejs;
  @ViewChild("containerThree") container!: ElementRef<HTMLDivElement>;
  
  constructor(private servicePokemon: PokemonResultService, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe(
      (param)=>{
        const id = param.get("id");
        if (id) {
          this.servicePokemon.getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`).
          subscribe((pokemon)=>{
            this.pokemonSent = new PokemonDetail(pokemon);
          });
        }
      }
    );
  }

  public fullscreenMethod(){
    if (!this.threejs.document.fullscreenElement) {
      this.container.nativeElement.requestFullscreen().catch((err)=>{console.log(err)});
      return
    }

    this.threejs.document.exitFullscreen().catch((err)=>{console.log(err)});
      return
  }
}