import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';

import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.css'
})
export class RecipesPageComponent implements OnInit {

  recipesList:RecipeModel[]=[];
  filteredRecipes: any[] = [];
  searchTerm: string = '';
  inputWidth: string = '18rem';

  //--------------------------
  constructor(private recipeServices:RecipesService , private router: Router )
  {

  }
  async ngOnInit() {
    await this.getRecipes();
    this.filteredRecipes = this.recipesList;
  }

  filterRecipes() {
    this.filteredRecipes = this.recipesList.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async getRecipes() {
    try {
      this.recipesList = await this.recipeServices.getAllRecipes().toPromise();
    } catch (error) {
      console.error('Error obteniendo recetas:', error);
    }
  }

  deleteRecipes(id:string){

    this.recipeServices.deleteRecipe(id).subscribe(
      (response:any)=>{

        console.log("se borror correctamente el listado ", response);
        this.getRecipes();
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }

  goEdit(id:string){

    this.router.navigate(['/', 'edit',id])

  }
}
