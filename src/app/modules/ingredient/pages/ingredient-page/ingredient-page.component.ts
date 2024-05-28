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
  isLoading: boolean = true;

  constructor(private recipeServices:RecipesService)
  {

  }
  async ngOnInit() {
    await this.getIngredients();
  }

  //--------------
  async getIngredients(){
    this.isLoading = true;

    try {
      this.IngredientsList = await this.recipeServices.getAllIngredients().toPromise();
    } catch (error) {
      console.error('Error obteniendo recetas:', error);
    } finally {
      this.isLoading = false;
    }
  }


}

