import { Component, OnInit } from '@angular/core';
import { ShoppingList } from '../shared/services/shoppingList.service';
import { Ingredient } from '../shared/models/ingrediants.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingList: ShoppingList) { }

  ngOnInit() {
    this.ingredients = this.shoppingList.getList();
    this.shoppingList.updatedIngredients.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
