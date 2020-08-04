
// import { EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Ingredient } from '../models/ingrediants.model';

export class ShoppingList {

  updatedIngredients = new Subject<Ingredient[]>();
  editItem = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples🍎', 5),
    new Ingredient('Tomatoes🍅', 10),
  ];

  getList() {
    return this.ingredients.slice();
  }

  getItem(index: number) {
    return this.ingredients[index];
  }

  updateItem(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.updatedIngredients.next(this.ingredients.slice());
  }

  deleteItem(index: number) {
    this.ingredients.splice(index, 1);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  newlyAddedIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  ingredientsFromRecipeDetail(ingrediants: Ingredient[]) {
    this.ingredients.push(...ingrediants);
    this.updatedIngredients.next(this.ingredients.slice());
  }

}