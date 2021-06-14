import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeListarComponent } from './anime-listar.component';

describe('AnimeListarComponent', () => {
  let component: AnimeListarComponent;
  let fixture: ComponentFixture<AnimeListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
