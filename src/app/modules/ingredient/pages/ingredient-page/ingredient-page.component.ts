import { Component ,OnInit} from '@angular/core';
import { IngredientModel } from '@core/models/ingredient.model';
import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-ingredient-page',
  templateUrl: './ingredient-page.component.html',
  styleUrl: './ingredient-page.component.css'
})
export class IngredientPageComponent implements  OnInit  {
 
  IngredientsList:IngredientModel[]=[];

  constructor(private recipeServices:RecipesService)
  {
    
  }
  ngOnInit(): void {
    this.getIngredients();
  }
  
  //--------------
  getIngredients(){

    this.recipeServices.getAllIngredients().subscribe(
      (response:IngredientModel[])=>{

        this.IngredientsList=response;
        console.log("obreniendo ingredientes ",response);
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }


}
