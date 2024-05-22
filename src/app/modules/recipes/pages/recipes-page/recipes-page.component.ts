import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';

import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent implements OnInit {

   recipesList:RecipeModel[]=[];

  //--------------------------
  constructor(private recipeServices:RecipesService , private router: Router )
  {
   
  }
  ngOnInit(): void {
    console.log("inicio recipes ");
    this.getRecipes();
    
  }
  
  //--------------
  getRecipes(){

    this.recipeServices.getAllRecipes().subscribe(
    (response:RecipeModel[])=>{
        
        this.recipesList=response;
        console.log("obreniendo recipes ",response);
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }

  deleteRecipes(id:string){

    this.recipeServices.deleteRecipe(id).subscribe(
      (response:any)=>{
        
        console.log("se borror correctamente el listado ", response);
        this.getRecipes();
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }

  goEdit(id:string){

    this.router.navigate(['/', 'edit',id])

  }
}
