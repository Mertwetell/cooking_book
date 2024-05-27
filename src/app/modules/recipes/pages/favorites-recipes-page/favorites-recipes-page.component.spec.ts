import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesRecipesPageComponent } from './favorites-recipes-page.component';

describe('FavoritesRecipesPageComponent', () => {
  let component: FavoritesRecipesPageComponent;
  let fixture: ComponentFixture<FavoritesRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesRecipesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
