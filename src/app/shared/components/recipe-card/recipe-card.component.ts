import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { FavoritesService } from '@shared/services/favorites.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent implements OnInit {
  @Input()
  recipe: RecipeModel = {
    _id: '',
    name: '',
    description: '',
    imagePath: '',
    ingredients: [{ name: '', amount: 0, edit: false, delete: false }],
  };

  heartIconClass: string = 'bi bi-suit-heart';

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.updateHeartIcon();
  }

  updateHeartIcon(): void {
    if (this.favoritesService.isFavorite(this.recipe._id)) {
      this.heartIconClass = 'bi bi-suit-heart-fill';
    } else {
      this.heartIconClass = 'bi bi-suit-heart';
    }
  }

  toggleIcon(state: string) {
    switch (state) {
      case 'normal':
        if (!this.favoritesService.isFavorite(this.recipe._id)) {
          this.heartIconClass = 'bi bi-suit-heart';
        }
        break;
      case 'filled':
      case 'clicked':
        this.heartIconClass = 'bi bi-suit-heart-fill';
        break;
      default:
        break;
    }
  }

  sendToFavorites() {
    if (this.favoritesService.isFavorite(this.recipe._id)) {
      this.favoritesService.removeFavorite(this.recipe._id);
      this.heartIconClass = 'bi bi-suit-heart';
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Receta eliminada de Favoritos',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.favoritesService.addFavorite(this.recipe);
      this.heartIconClass = 'bi bi-suit-heart-fill';
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Receta agregada a Favoritos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
