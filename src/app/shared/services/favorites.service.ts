import { Injectable } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesRecipes: RecipeModel[] = [];

  constructor(private recipeServices: RecipesService) {
    this.loadFavorites();
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

  async loadFavorites(): Promise<RecipeModel[]> {
    const savedFavorites = localStorage.getItem('favoritesRecipes');

    if (savedFavorites) {
      const parsedFavorites: RecipeModel[] = JSON.parse(savedFavorites);
      const existencePromises = parsedFavorites.map(async (fav) => {
        const exists = await this.recipeExists(fav._id);
        return exists ? fav : null;
      });
      const results = await Promise.all(existencePromises);

      const validFavorites = results.filter(fav => fav !== null) as RecipeModel[];
      this.favoritesRecipes = validFavorites;
      this.saveFavorites();
      return validFavorites;
    }

    return [];
  }

  private async recipeExists(id: string): Promise<boolean> {
    try {
      const recipe = await this.recipeServices.getRecipe(id).toPromise();

      // Si la receta se encuentra, devuelve true
      return !!recipe;
    } catch (error) {
      console.error('Error al verificar la existencia de la receta:', error);

      return false;
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favoritesRecipes', JSON.stringify(this.favoritesRecipes));
  }
}

