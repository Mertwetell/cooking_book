import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { AuthService } from '@modules/auth/services/auth.service';
import Swal from 'sweetalert2';

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
  isLoading: boolean = true;

  //--------------------------
  constructor(private recipeServices:RecipesService , private authService:AuthService , private router: Router )
  {

  }
  async ngOnInit() {
    await this.getRecipes();
    this.filteredRecipes = this.recipesList;
    this.isLoading = false;
  }

  filterRecipes() {
    this.filteredRecipes = this.recipesList.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async getRecipes() {
    this.isLoading = true;
    try {
      this.recipesList = await this.recipeServices.getAllRecipes().toPromise();
    } catch (error:any) {
        Swal.fire({
          title: "Error",
          text: "Error al obtener recetas, inténtelo más tarde",
          icon: "error",
        });
        this.authService.validToken(error);
    } finally {
      this.isLoading = false;
      
     
    }
  }

  deleteRecipes(id:string){

    this.recipeServices.deleteRecipe(id).subscribe(
      (response:any)=>{

        console.log("se borror correctamente el listado ", response);
        this.getRecipes();
      },
      error=>{
        Swal.fire({
          title: "Error",
          text: "Error al borrar receta, inténtelo más tarde",
          icon: "error",
        });
        this.authService.validToken(error);
      }
    );

  }

  goEdit(id:string){

    this.router.navigate(['/', 'edit',id])

  }
}
