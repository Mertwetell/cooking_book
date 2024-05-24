import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '@shared/services/recipes.service';

@Component({
  selector: 'app-edit-recipes-page',
  templateUrl: './edit-recipes-page.component.html',
  styleUrl: './edit-recipes-page.component.css'
})
export class EditRecipesPageComponent implements OnInit {

  idRecipe:string="";
  currentRecipe:RecipeModel={name:"", description:"",_id:"", imagePath:"", ingredients:[] };
  isEdit:boolean=true;

  constructor(private route:ActivatedRoute,private recipeServices:RecipesService)
  {

  }

  ngOnInit(): void {
    this.idRecipe=this.route.snapshot.params["id"];
    this.getRecipe();
  }

  //-----------
  addnewRowIngredient(){
    if(this.currentRecipe.ingredients.length>0){
      const listTmp=this.currentRecipe.ingredients.filter(a=>a.name.length==0);
      if(listTmp.length>0){
        return;
       }
    }
    this.currentRecipe.ingredients.push({name:"",amount:0,edit:true,delete:false });
  }

  editRowIngredient(){
  }

  deleteRowIngredient(){
  }
  //--------------
  getRecipe(){

    this.recipeServices.getRecipe(this.idRecipe).subscribe(
      (response:RecipeModel)=>{

        this.currentRecipe=response;
        console.log("obreniendo recipe ",response);
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }

  saveRecipe(){

    let newDataRecipe:RecipeModel= {
      _id:"",
      name: "",
      description: "",
      imagePath: "",
      ingredients:[]
    };

    this.recipeServices.editRecipe(this.idRecipe, newDataRecipe).subscribe(
      (response:any)=>{

        console.log("obreniendo recipe ",response);
      },
      error=>{
        console.log("Ocurrio un error al obtener recetas ", error);
      }
    );

  }

}
