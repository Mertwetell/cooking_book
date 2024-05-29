import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeInputsComponent } from './components/recipe-inputs/recipe-inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgBrokenDirective } from './directives/img-broken.directive';



@NgModule({
  declarations: [
    NavBarComponent,
    RecipeCardComponent,
    RecipeInputsComponent,
    ImgBrokenDirective
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
    RecipeInputsComponent,
    ImgBrokenDirective
  ]
})
export class SharedModule { }
