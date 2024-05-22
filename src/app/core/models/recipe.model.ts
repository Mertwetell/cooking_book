import { IngredientModel } from "./ingredient.model";

export interface RecipeModel {
    _id:string;
    name: string;
    description: string;
    imagePath: string;
    ingredients:IngredientModel[];
}