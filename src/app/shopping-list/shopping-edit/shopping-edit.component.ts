// import {
//   Component,
//   OnInit,
// } from '@angular/core';
// import { NgForm } from '@angular/forms';


// import { Ingredient } from '../../shared/models/ingrediants.model';
// import { ShoppingList } from '../../shared/services/shoppingList.service';

// @Component({
//   selector: 'app-shopping-edit',
//   templateUrl: './shopping-edit.component.html',
//   styleUrls: ['./shopping-edit.component.css']
// })
// export class ShoppingEditComponent implements OnInit {

//   constructor(private shoppingListService: ShoppingList) { }

//   ngOnInit() {
//   }

//   onAddItem(itemForm: NgForm) {
//     const values = itemForm.value;
//     const newIngredient = new Ingredient(values.itemName, values.itemAmount);
//     this.shoppingListService.newlyAddedIngredient(newIngredient);
//   }

// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingList } from 'src/app/shared/services/shoppingList.service';
import { Ingredient } from 'src/app/shared/models/ingrediants.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;

  dish: string;
  price: number;
  editMode: boolean = false;
  itemIndex: number;
  editItem: Ingredient;


  editSubscription = new Subscription;

  constructor(private shoppingListService: ShoppingList) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'dishName': new FormControl(null, [Validators.required]),
      'dishPrice': new FormControl(null, [Validators.required], this.minimumPrice)
    });

    this.editSubscription = this.shoppingListService.editItem.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getItem(index);

        this.itemForm.setValue({
          'dishName': this.editItem.name,
          'dishPrice': this.editItem.amount
        })
      }
    )
  }

  minimumPrice(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if ((control.value) <= 1) {
        resolve({ 'invalidAmount': true })
      }
      else {
        resolve(null)
      }
    })
    return promise;
  }

  onSubmit() {
    this.dish = this.itemForm.value.dishName;
    this.price = this.itemForm.value.dishPrice;
    if (this.editMode) {
      this.shoppingListService.updateItem(this.itemIndex, new Ingredient(this.dish, this.price));
    }
    // console.log(this.itemForm.value.dishPrice, this.itemForm.value.dishName);
    else {
      this.shoppingListService.newlyAddedIngredient(new Ingredient(this.dish, this.price));
    }
    this.editMode = false;
    this.itemForm.reset()
  }

  clearForm() {
    this.editMode = false;
    this.itemForm.reset()
    // console.log(this.itemForm)
  }

  deleteItem() {
    this.shoppingListService.deleteItem(this.itemIndex);
    this.clearForm();
    // this.itemIndex = null;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }


}