import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { RecipeModel } from '@core/models/recipe.model';
import { IngredientModel } from '@core/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly url=environment.api;

  constructor(private httClient:HttpClient) { }

    getAllRecipes():Observable<any>{

      return this.httClient.get(`${this.url}/recipes/get`)
    }


    getRecipe(id:string):Observable<any>{

      return this.httClient.get(`${this.url}/recipes/get?key=${id}`).pipe(
        map((recipes:any)=>{
          const recipe = recipes.find((recipe: any) => recipe._id === id);

          return recipe || null;
        })
      );
    }

    getAllIngredients():Observable<any>{
      return this.httClient.get(`${this.url}/recipes/get`).pipe(
       map((recipes:any)=>{

        const ingredient:Array<any>=[];
        for (let i = 0; i < recipes.length; i++) {
          //console.log("mojon ingrediente", recipes[i].ingredients.length);
          for (let j = 0; j < recipes[i].ingredients.length; j++) {

            const pos = ingredient.map((e:any) => e.name).indexOf(recipes[i].ingredients[j].name);
            //console.log(pos);
            if(pos>-1){
              ingredient[pos].amount+=recipes[i].ingredients[j].amount;
            }else{
             ingredient.push(recipes[i].ingredients[j]);
            }
          }

        }

        return ingredient;
       })

      );

    }
/*if(element.ingredients.length>0){
              ingredient=[...ingredient, ...element.ingredients];
            }*/
    addRecipe(recipe:RecipeModel):Observable<any>{
      return this.httClient.post(`${this.url}/recipes/add`,recipe)
    }

    editRecipe(id:string, recipe:RecipeModel):Observable<any>{
      return this.httClient.put(`${this.url}/recipes/edit/${id}`,recipe)
    }

    deleteRecipe(id:string):Observable<any>{
      return this.httClient.delete(`${this.url}/recipes/delete/${id}`)
    }

}
