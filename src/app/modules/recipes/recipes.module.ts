import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { NewRecipesPageComponent } from './pages/new-recipes-page/new-recipes-page.component';
import { EditRecipesPageComponent } from './pages/edit-recipes-page/edit-recipes-page.component';



@NgModule({
  declarations: [
    RecipesPageComponent,
    NewRecipesPageComponent,
    EditRecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    FormsModule
    
  ]
})
export class RecipesModule { }
