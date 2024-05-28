import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeInputsComponent } from './components/recipe-inputs/recipe-inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavBarComponent,
    RecipeCardComponent,
    RecipeInputsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    RecipeCardComponent,
    RecipeInputsComponent
  ]
})
export class SharedModule { }
