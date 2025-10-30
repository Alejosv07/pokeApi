import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail';
import { Home } from './pages/home/home';
 
export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "pokemonDetail/:id",
        component: PokemonDetailComponent
    },
    {
        path:"**",
        redirectTo: "",
        pathMatch: "full"
    },
];
