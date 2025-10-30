import { Component, ViewChild } from '@angular/core';
import { Loading } from "../utils/loading/loading";
import { Searchpokemon } from "../searchpokemon/searchpokemon";

@Component({
  selector: 'app-header',
  imports: [Loading],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
}
