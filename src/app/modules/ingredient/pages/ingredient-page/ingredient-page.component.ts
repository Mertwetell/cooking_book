import { Component ,OnInit} from '@angular/core';
import { IngredientModel } from '@core/models/ingredient.model';
import { RecipesService } from '@shared/services/recipes.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: "Error",
          text: "Error al obtener ingredientes, inténtelo más tarde",
          icon: "error",
        });
    } finally {
      this.isLoading = false;
    }
  }


}

