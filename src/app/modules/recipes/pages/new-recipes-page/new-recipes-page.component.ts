import { Component } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-new-recipes-page',
  templateUrl: './new-recipes-page.component.html',
  styleUrl: './new-recipes-page.component.css'
})
export class NewRecipesPageComponent {


  constructor(private recipeServices:RecipesService)
  {
    
  }
  
  //--------------
  addIngredient(){

    let newRecipe:RecipeModel= {
      _id:"",
      name: "",
      description: "",
      imagePath: "",
      ingredients:[]
    };

    this.recipeServices.addRecipe(newRecipe).subscribe(
      (response:any[])=>{
        
        
        console.log("obreniendo recipes ",response);
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );
  }
}
