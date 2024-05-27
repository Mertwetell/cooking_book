import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { NewRecipesPageComponent } from './pages/new-recipes-page/new-recipes-page.component';
import { EditRecipesPageComponent } from './pages/edit-recipes-page/edit-recipes-page.component';
import { FavoritesRecipesPageComponent } from './pages/favorites-recipes-page/favorites-recipes-page.component';

const routes: Routes = [
  {
    path:'',
    component: RecipesPageComponent
  },
  {
    path:'new',
    component: NewRecipesPageComponent
  },
  {
    path:'favorites',
    component: FavoritesRecipesPageComponent
  },
  {
    path:'edit/:id', component: EditRecipesPageComponent
  },
  {
    path:'**',
    redirectTo:''

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule {

}
