import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Ingredient } from '../models/ingrediants.model';
import { ShoppingList } from './shoppingList.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class RecipeService {
  selectedRecipe = new Subject<Recipe>();
  fbUrl = environment.fbUrl;
  private recipes: Recipe[] = [
    new Recipe(
      'Kothu parotta',
      'This is simply a test',
      '../../../assets/images/pic_1.jpg',
      [
        new Ingredient('Maidha', 3, 'sfjhgf87687'),
        new Ingredient('Egg', 5, 'dsflih87698'),
        new Ingredient('Spices', 12, 'sdfjhsd987'),
      ]),
    new Recipe(
      'Bun Parotta',
      'This is simply a test',
      '../../../assets/images/pic_2.jpg',
      [
        new Ingredient('Maidha', 3, 'sfjhgf87687'),
        new Ingredient('Egg', 5, 'dsflih87698'),
        new Ingredient('Spices', 12, 'sdfjhsd987'),
      ])
  ];

  constructor(private shoppingListService: ShoppingList, private http: HttpClient) { }

  saveRecipe() {
    this.http.put(this.fbUrl + 'recipe.json', this.recipes)
      .subscribe(response => {
        console.log(response)
      })
  }

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