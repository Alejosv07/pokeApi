import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchpokemon } from './searchpokemon';

describe('Searchpokemon', () => {
  let component: Searchpokemon;
  let fixture: ComponentFixture<Searchpokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchpokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchpokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
