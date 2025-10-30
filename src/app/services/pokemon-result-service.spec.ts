import { TestBed } from '@angular/core/testing';

import { PokemonResultService } from './pokemon-result-service';

describe('PokemonResultService', () => {
  let service: PokemonResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
