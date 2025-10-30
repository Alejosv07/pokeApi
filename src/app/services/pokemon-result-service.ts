import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PokemonResult } from '../models/pokemon-result';
import { PokemonDetail } from '../models/pokemon-detail';

@Injectable({
  providedIn: 'root'
})

export class PokemonResultService {
  private url: string = ``;

  constructor(private http: HttpClient){
  }

  findAll(limit: number, offset: number){
    this.url = `${environment.Host}pokemon/?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonResult>(this.url);
  }

  getPokemonDetail(url: string){
    return this.http.get<PokemonDetail>(url);
  }
  
}
