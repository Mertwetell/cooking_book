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
          return recipes[0];

        })
      );
    }

    getAllIngredients():Observable<any>{
      return this.httClient.get(`${this.url}/recipes/get`).pipe(
       map((recipes:any)=>{
        let ingredient:any=[];
          recipes.forEach((element:any) => {
            if(element.ingredients.length==0){
              ingredient=[...ingredient, ...element.ingredients];
            }

          });
        return ingredient;
       })

      );

    }

    addRecipe(recipe:RecipeModel):Observable<any>{
      return this.httClient.post(`${this.url}/recipes/add`,recipe)
    }

    editRecipe(id:string, recipe:RecipeModel):Observable<any>{
      return this.httClient.put(`${this.url}/recipes/edit?key=${id}`,recipe)
    }

    deleteRecipe(id:string):Observable<any>{
      return this.httClient.delete(`${this.url}/recipes/delete?key=${id}`)
    }

}
