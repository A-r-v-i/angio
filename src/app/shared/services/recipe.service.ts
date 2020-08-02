import { Recipe } from '../models/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingrediants.model';
import { ShoppingList } from './shoppingList.service';


@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kothu parotta',
      'This is simply a test',
      '../../../assets/images/pic_1.jpg',
      [
        new Ingredient('Maidha', 3),
        new Ingredient('Egg', 5),
        new Ingredient('Spices', 12),
      ]),
    new Recipe(
      'Bun Parotta',
      'This is simply a test',
      '../../../assets/images/pic_2.jpg',
      [
        new Ingredient('Maidha', 3),
        new Ingredient('Egg', 5),
        new Ingredient('Spices', 12),
      ])
  ];

  constructor(private shoppingListService: ShoppingList) { }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeDetail(id: number) {
    return this.recipes[id];
  }

  addedToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.ingredientsFromRecipeDetail(ingredient)
  }


}