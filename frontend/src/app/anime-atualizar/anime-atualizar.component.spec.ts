import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeAtualizarComponent } from './anime-atualizar.component';

describe('AnimeAtualizarComponent', () => {
  let component: AnimeAtualizarComponent;
  let fixture: ComponentFixture<AnimeAtualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeAtualizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
