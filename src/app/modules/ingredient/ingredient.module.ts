import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredienRoutingModule } from './ingredient-routing.module';
import { IngredientPageComponent } from './pages/ingredient-page/ingredient-page.component';


@NgModule({
  declarations: [
    IngredientPageComponent
  ],
  imports: [
    CommonModule,
    IngredienRoutingModule
  ]
})
export class IngredientModule { }
