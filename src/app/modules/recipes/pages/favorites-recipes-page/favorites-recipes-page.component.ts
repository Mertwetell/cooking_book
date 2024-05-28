import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { FavoritesService } from '@shared/services/favorites.service';

@Component({
  selector: 'app-favorites-recipes-page',
  templateUrl: './favorites-recipes-page.component.html',
  styleUrl: './favorites-recipes-page.component.css',
})
export class FavoritesRecipesPageComponent implements OnInit {
  favoritesRecipes: RecipeModel[] = [];

  constructor(private favoritesService: FavoritesService) {}

  isLoading: boolean = true;

  async ngOnInit() {
    await this.loadFavoriteRecipes();
  }

  private async loadFavoriteRecipes() {
    this.isLoading = true;
    this.favoritesRecipes = await this.favoritesService.getFavorites();
    this.isLoading = false;
  }
}


