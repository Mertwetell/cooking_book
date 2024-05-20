import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientPageComponent } from './pages/ingredient-page/ingredient-page.component';

const routes: Routes = [{
  path:'', component: IngredientPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredienRoutingModule { }
