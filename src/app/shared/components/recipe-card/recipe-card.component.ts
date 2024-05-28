import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { FavoritesService } from '@shared/services/favorites.service';
import { RecipesService } from '@shared/services/recipes.service';
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
    ingredients: [{_id:"", name: '', amount: 0 }],
  };

  heartIconClass: string = 'bi bi-suit-heart';

  constructor(private favoritesService: FavoritesService,
    private recipeServices: RecipesService) {}

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

  deleteRecipe(idRecipe: string){
    Swal.fire({
      title: "¿Desea eliminar la receta?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6e936a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeServices.deleteRecipe(idRecipe).subscribe(
          (response:any)=>{
            console.log("borrando recipe ",response);
          },
          error=>{
            console.log("Ocurrio un error al borrar receta ", error);
          }
        );
        Swal.fire({
          title: "Eliminado!",
          text: "La receta ha sido eliminada",
          icon: "success"
        });
      }
    });
  }
}
