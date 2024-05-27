import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { NewRecipesPageComponent } from './pages/new-recipes-page/new-recipes-page.component';
import { EditRecipesPageComponent } from './pages/edit-recipes-page/edit-recipes-page.component';
import { FavoritesRecipesPageComponent } from './pages/favorites-recipes-page/favorites-recipes-page.component';



@NgModule({
  declarations: [
    RecipesPageComponent,
    NewRecipesPageComponent,
    EditRecipesPageComponent,
    FavoritesRecipesPageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class RecipesModule { }
