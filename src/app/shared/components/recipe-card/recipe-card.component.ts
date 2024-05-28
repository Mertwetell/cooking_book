import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { FavoritesService } from '@shared/services/favorites.service';
import { RecipesService } from '@shared/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input()
  recipe: RecipeModel = {
    _id: '',
    name: '',
    description: '',
    imagePath: '',
    ingredients: [{_id:"", name: '', amount: 0 }],
  };

  constructor(private favoritesService: FavoritesService,
    private recipeServices: RecipesService,
    private router: Router) {}


  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.recipe._id);
  }

  toggleFavorite() {
    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.recipe._id);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Receta eliminada de Favoritos',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        if (window.location.pathname === '/recipes/favorites') {
          setTimeout(() => {
            this.router.navigate(['/recipes']);
          }, 1000);
        }
      });
    } else {
      this.favoritesService.addFavorite(this.recipe);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Receta agregada a Favoritos',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        if (window.location.pathname === '/recipes/favorites') {
          setTimeout(() => {
             this.router.navigate(['/recipes']);
          }, 1000);
        }
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
            Swal.fire({
              title: "Eliminado!",
              text: "La receta ha sido eliminada",
              icon: "success"
            }).then(() => {
              if (window.location.pathname === '/recipes/favorites') {
              setTimeout(() => {
                this.router.navigate(['/recipes']);
              }, 1000);
            }else{
              window.location.reload();
            }
              
            });
          },
          error=>{
            console.log("Ocurrio un error al borrar receta ", error);
          }
        );
      }
    });
  }
}
