import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingList } from '../shared/services/shoppingList.service';
import { Ingredient } from '../shared/models/ingrediants.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  // ingredient: Ingredient;
  private slSubscription: Subscription;
  private updateSubscription: Subscription;

  constructor(private shoppingList: ShoppingList) { }

  ngOnInit() {
    this.ingredients = this.shoppingList.getList();
    this.slSubscription = this.shoppingList.updatedIngredients.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
    // this.updateSubscription = this.shoppingList.updateItem.subscribe(
    //   (ingredient: Ingredient) => {
    //     this.ingredient = ingredient;
    //     this.ingredients.push(ingredient)
    //   }
    // )

  }
  ngOnDestroy() {
    this.slSubscription.unsubscribe();
    // this.updateSubscription.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  onEditItem(index: number) {
    console.log(index)
    this.shoppingList.editItem.next(index);
  }
}
