import {Ingredient} from '../models/ingrediants.model';
import { EventEmitter } from '@angular/core';

export class ShoppingList {

  updatedIngredients = new EventEmitter<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples🍎', 5),
    new Ingredient('Tomatoes🍅', 10),
  ];

  getList() {
    return this.ingredients.slice()
  }

  newlyAddedIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.updatedIngredients.emit(this.ingredients.slice());
  }

  ingredientsFromRecipeDetail(ingrediants: Ingredient[]) {
    this.ingredients.push(...ingrediants);
    this.updatedIngredients.emit(this.ingredients.slice());
  }

}