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

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesRecipes = this.favoritesService.getFavorites();
    console.log('Favoritos cargados', this.favoritesRecipes);
  }
}
