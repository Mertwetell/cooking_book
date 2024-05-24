import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-new-recipes-page',
  templateUrl: './new-recipes-page.component.html',
  styleUrl: './new-recipes-page.component.css'
})
export class NewRecipesPageComponent {

  newRecipe:RecipeModel={name:"", description:"",_id:"", imagePath:"", ingredients:[] };
  formNewRecipe: FormGroup = new FormGroup({});

  constructor(private recipeServices:RecipesService)
  {

  }

  addRecipe(){

    //const { name, description, imagePath } = this.formNewRecipe.value

    // let newRecipe: RecipeModel = {
    //   //TODO: FALTA INGREDIENTES Y ID
    //   _id:"",
    //   name: name,
    //   description: description,
    //   imagePath: imagePath,
    //   ingredients:[]
    // };


    // this.recipeServices.addRecipe(newRecipe).subscribe(
    //   (response:any[])=>{


    //     console.log("obreniendo recipes ",response);
    //   },
    //   error=>{
    //     console.log("Ocurrio un error al obtener recetas ", error);
    //   }
    // );
  }
}
