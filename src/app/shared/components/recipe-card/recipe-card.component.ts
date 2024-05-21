import { Component, Input, input } from '@angular/core';
import { RecipeModel } from '@core/models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  @Input()
  recipe: RecipeModel = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: { name: '', amount: 0 }
  };
  
}


