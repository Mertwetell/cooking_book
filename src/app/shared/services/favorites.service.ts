import { Injectable } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesRecipes: RecipeModel[] = [];

  constructor() {
    this.loadFavorites();
  }

  getFavorites(): RecipeModel[] {
    return this.favoritesRecipes;
  }

  addFavorite(recipe: RecipeModel): void {
    if (!this.favoritesRecipes.some(fav => fav._id === recipe._id)) {
      this.favoritesRecipes.push(recipe);
      this.saveFavorites();
    }
  }

  isFavorite(id: string): boolean {
    return this.favoritesRecipes.some(recipe => recipe._id === id);
  }

  removeFavorite(id: string): void {
    this.favoritesRecipes = this.favoritesRecipes.filter(recipe => recipe._id !== id);
    this.saveFavorites();
  }

  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favoritesRecipes');
    if (savedFavorites) {
      this.favoritesRecipes = JSON.parse(savedFavorites);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favoritesRecipes', JSON.stringify(this.favoritesRecipes));
  }
}
