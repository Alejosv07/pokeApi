import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typepokemon } from './typepokemon';

describe('Typepokemon', () => {
  let component: Typepokemon;
  let fixture: ComponentFixture<Typepokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typepokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typepokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
