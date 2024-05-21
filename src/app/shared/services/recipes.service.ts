import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import {catchError, map}from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { RecipeModel } from '@core/models/recipe.model';
import { IngredientModel } from '@core/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly url=enviroment.api;

  constructor(private httClient:HttpClient) { }

    getAllRecipes():Observable<any>{
  
      return this.httClient.get(`${this.url}/recipes/get`)
    }
  
    getAllIngredients():Observable<any>{
      return this.httClient.get(`${this.url}/recipes/get`).pipe(
       map((recipes:any)=>{
        let ingredient: Array<IngredientModel>=[];
          recipes.array.each((element:any) => {
            ingredient.push(element.ingredients);
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
