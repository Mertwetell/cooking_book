import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { IngredientTableComponent } from './components/ingredient-edit-table/ingredient-edit-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    RecipeCardComponent,
    IngredientTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    NavBarComponent,
    RecipeCardComponent,
    IngredientTableComponent
  ]
})
export class SharedModule { }
