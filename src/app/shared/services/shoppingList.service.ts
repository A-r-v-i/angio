
// import { EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Ingredient } from '../models/ingrediants.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })

export class ShoppingList {

  constructor(private http: HttpClient) { }
  fbUrl = environment.fbUrl;

  newIngrdient: Ingredient;

  ingredientsList = new Subject<Ingredient[]>();

  updatedIngredients = new Subject<Ingredient[]>();
  editItem = new Subject<number>();

  ingredients: Ingredient[] = [];

  storeItems(dish: Ingredient) {
    console.log(dish);
    return this.http.post(`${this.fbUrl}item.json`, dish, {
      observe: 'response'
    })
    // .subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // )
  }
  getList() {
    // console.log(this.ingredients)
    let tempArr = [];
    this.http.get(`${this.fbUrl}item.json`, {
      headers: new HttpHeaders({ 'Custom-Header': 'Sample' }),
      params: new HttpParams().set('name', 'aravind'),
    })
      .pipe(map((response) => {
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            tempArr.push({ ...response[key], id: key });
          }
        }
        return tempArr;
      }))
      .subscribe(dishes => {
        // console.log(this.ingredients)
        dishes.map(dish => {
          this.ingredients.push(new Ingredient(dish.dishName, dish.dishPrice, dish.id));
        })
      })
    // console.log(this.ingredients);
    // return this.ingredientsList.next(this.ingredients);
    return this.ingredients;

  }

  getItem(index: number) {
    return this.ingredients[index];
  }

  updateItem(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.updatedIngredients.next(this.ingredients.slice());
  }

  deleteItem() {
    // console.log(id);
    return this.http.delete(`${this.fbUrl}item.json`);

    // this.ingredients.splice(index, 1);
    // this.updatedIngredients.next(this.ingredients.slice());
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