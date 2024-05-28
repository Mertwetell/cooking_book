
import { FormArray,  FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeModel } from './recipe.model';

export class RecipeViewModel{

    formRecipe: FormGroup=new FormGroup({});

   newRecipe(){
    this.formRecipe=new FormGroup(
        {
        _id:new FormControl(''),
        name: new FormControl('', [Validators.required,Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required,Validators.maxLength(500)]),
        imagePath: new FormControl ('', [Validators.required, Validators.maxLength(500)]),
        ingredients:new FormArray([])
        }
      );

      this.addnewIngredient();
    }

    currentRecipe(current:RecipeModel){
        this.formRecipe=new FormGroup(
          {
            _id:new FormControl(current._id),
            name: new FormControl(current.name, [Validators.required,Validators.maxLength(100)]),
            description: new FormControl(current.description, [Validators.required,Validators.maxLength(500)]),
            imagePath: new FormControl (current.imagePath, [Validators.required, Validators.maxLength(500)]),
            ingredients:new FormArray([])
          }
        );

        current.ingredients.forEach((ingred)=>{
            this.fIngredients.push(new FormGroup({
                _id:new FormControl(ingred._id),
                name:  new FormControl(ingred.name, [Validators.required,Validators.maxLength(100)]),
                amount: new FormControl(ingred.amount, [Validators.required, Validators.min(1)]),
              }));

        })
    }

  //----------------------------------
      get fIngredients(): FormArray {
        return this.formRecipe.get('ingredients') as FormArray;
      }

      removeIngredient(index: number) {
        this.fIngredients.removeAt(index);
      }

      addnewIngredient(){
        const newRow = new FormGroup({
          name:  new FormControl('', [Validators.required,Validators.maxLength(100)]),
          amount: new FormControl(1, [Validators.required, Validators.min(1)]),
        });
        this.fIngredients.push(newRow);



      }
  //--------------------------
  getRecipeModel(): RecipeModel{

     const currentRecipe:RecipeModel=  this.formRecipe.value

      return  currentRecipe;
  }


}
