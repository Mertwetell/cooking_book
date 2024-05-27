import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path:'recipes',
    loadChildren:()=> import( '@modules/recipes/recipes.module').then(m=>m.RecipesModule)
  },
  {
    path:'ingredients',
    loadChildren:()=> import( '@modules/ingredient/ingredient.module').then(m=>m.IngredientModule)
  },
  /*,
  {
    path:'**',
    redirectTo:'/recipes'

  }*/];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
