import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent implements OnInit {

// response: RecipeModel = {
//   name: 'hola',
//   description: 'soy una receta',
//   imagePath: '',
//   ingredients: { name: 'mayonesa', amount: 100 }
// };
  recipesList: Array<RecipeModel> = []

  constructor (private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.loadAllRecipes()
  }

  loadAllRecipes(): void {
    this.recipeService.getAllRecipes()
    .subscribe((response: RecipeModel[]) => {
      this.recipesList = response
    })
  }
}

