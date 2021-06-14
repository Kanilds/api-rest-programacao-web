import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCadastrarComponent } from './anime-cadastrar.component';

describe('AnimeCadastrarComponent', () => {
  let component: AnimeCadastrarComponent;
  let fixture: ComponentFixture<AnimeCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
