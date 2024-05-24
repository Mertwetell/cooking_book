import { Component, Input } from '@angular/core';
import { IngredientModel } from '@core/models/ingredient.model';

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-edit-table.component.html',
  styleUrl: './ingredient-edit-table.component.css'
})
export class IngredientTableComponent {
  @Input() ingredients:IngredientModel[]=[];
  @Input() invalid:boolean|null=false;

  addnewRowIngredient(){
    if(this.ingredients.length>0){
      const listTmp=this.ingredients.filter(a=>a.name.length==0);
      if(listTmp.length>0){
        return;
       }
    }
    this.ingredients.push({name:"",amount:0,edit:true,delete:false });
  }
}
