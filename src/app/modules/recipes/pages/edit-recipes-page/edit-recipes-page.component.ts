import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '@shared/services/recipes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-recipes-page',
  templateUrl: './edit-recipes-page.component.html',
  styleUrl: './edit-recipes-page.component.css'
})
export class EditRecipesPageComponent implements OnInit {

  idRecipe:string="";
  currentRecipe:any={name:"", description:"",_id:"", imagePath:"", ingredients:[] };
  isEdit:boolean=false;
  isLoading: boolean = true;

  constructor(private route:ActivatedRoute,private recipeServices:RecipesService, private router: Router)
  {

  }

  async ngOnInit() {
    this.idRecipe=this.route.snapshot.params["id"];
    try{
      this.isEdit=this.route.snapshot.queryParams['isEdit'];
    }catch(error){
      this.isEdit=false;
    }
    
    
    await this.getRecipe();
    this.isLoading = false;
  }

  toggleEdit(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isEdit = inputElement.checked;
  }

  //-----------
  addnewRowIngredient(){
    if(this.currentRecipe.ingredients.length>0){
      const listTmp=this.currentRecipe.ingredients.filter((a:any)=>a.name.length==0);
      if(listTmp.length>0){
        return;
       }
    }
    this.currentRecipe.ingredients.push({ name:"",amount:1 });
  }

  /*editRowIngredient(){
  }*/

  deleteRowIngredient(index:number){
    this.currentRecipe.ingredients.splice(index,1);
  }
  //--------------
  async getRecipe(){
    try {
      this.currentRecipe = await this.recipeServices.getRecipe(this.idRecipe).toPromise();
    } catch (error) {
      console.error('Error obteniendo recetas:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // async getRecipes() {
  //   try {
  //     this.recipesList = await this.recipeServices.getAllRecipes().toPromise();
  //   } catch (error) {
  //     console.error('Error obteniendo recetas:', error);
  //   }
  // }

  saveRecipe(){

    
    Swal.fire({
      title: "¿Desea guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#6e936a",
      cancelButtonText: "Cancelar",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeServices.editRecipe(this.idRecipe, this.currentRecipe).subscribe(
          (response:any)=>{
            console.log("obteniendo recipe ",response);
            this.router.navigate(['/', 'recipes']);
          },
          error=>{
            console.log("Ocurrio un error al obtener recetas ", error);
          }
        );
        Swal.fire("Guardado!", "", "success");
        //this.router.navigate(['/', 'recipes']);
      } else if (result.isDenied) {
        Swal.fire("Los cambios no han sido guardados", "", "info");
      }
    });


  }

}
