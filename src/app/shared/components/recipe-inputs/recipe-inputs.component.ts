import { Component, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RecipeModel } from '@core/models/recipe.model';

@Component({
  selector: 'app-recipe-inputs',
  templateUrl: './recipe-inputs.component.html',
  styleUrl: './recipe-inputs.component.css'
})
export class RecipeInputsComponent {

  @Input()
  recipe: RecipeModel = {
    _id: '',
    name: '',
    description: '',
    imagePath: '',
    ingredients: [{_id:"", name: '', amount: 0 }]
  };
  @Input() formGroup = new FormGroup({});
  @Input() useReactiveForm: boolean = true;

}
