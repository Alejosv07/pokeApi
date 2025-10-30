import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Threejs } from './threejs';

describe('Threejs', () => {
  let component: Threejs;
  let fixture: ComponentFixture<Threejs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Threejs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Threejs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
