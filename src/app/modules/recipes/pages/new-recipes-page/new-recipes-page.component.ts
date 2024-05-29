import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipeViewModel } from '@core/models/recipe.view.model';
import { RecipesService } from '@shared/services/recipes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-recipes-page',
  templateUrl: './new-recipes-page.component.html',
  styleUrl: './new-recipes-page.component.css'
})
export class NewRecipesPageComponent implements OnInit {

  recipeContex:RecipeViewModel=new RecipeViewModel();

  constructor(private recipeServices:RecipesService,private router: Router)
  {

  }

  ngOnInit(): void {
    this.recipeContex.newRecipe();

  }

//-------------------
  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  addRecipe(){

    let newRecipe:RecipeModel= this.recipeContex.getRecipeModel();

    newRecipe.name = this.capitalizeFirstLetter(newRecipe.name);
    newRecipe.description = this.capitalizeFirstLetter(newRecipe.description);

    Swal.fire({
      title: "¿Desea guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {

        this.recipeServices.addRecipe(newRecipe).subscribe(
          (response:any[])=>{

            console.log("obreniendo recipes ",response);
            this.router.navigate(['/', 'recipes']);
          },
          error=>{
            console.log("Ocurrio un error al obtener recetas ", error);
          }
        );

        Swal.fire("Guardado!", "", "success");
        //this.router.navigate(['/', 'recipes']);
      } else if (result.isDenied) {
        Swal.fire("Los cambios no han sido guardados", "", "info");
      }
    });


  }

  cancel(){
    this.router.navigate(['/', 'recipes']);
  }
}
