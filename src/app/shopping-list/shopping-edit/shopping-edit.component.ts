import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingList } from 'src/app/shared/services/shoppingList.service';
import { Ingredient } from 'src/app/shared/models/ingrediants.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;

  dish: string;
  price: number;
  id: string;
  editMode: boolean = false;
  itemIndex: number;
  editItem: Ingredient;

  fbUrl = environment.fbUrl;

  editSubscription = new Subscription;

  constructor(private httpClient: HttpClient, private shoppingListService: ShoppingList) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      'dishName': new FormControl(null, [Validators.required]),
      'dishPrice': new FormControl(null, [Validators.required], this.minimumPrice),
      'id': new FormControl(null)
    });

    this.editSubscription = this.shoppingListService.editItem.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getItem(index);
        this.id = this.editItem.id;
        this.itemForm.setValue({
          'dishName': this.editItem.dishName,
          'dishPrice': this.editItem.dishPrice,
          'id': this.editItem.id
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
    this.id = this.itemForm.value.id;

    if (this.editMode) {
      this.shoppingListService.updateItem(this.itemIndex, new Ingredient(this.dish, this.price, this.id));
    }
    else {
      this.shoppingListService.storeItems(new Ingredient(this.dish, this.price)).subscribe(
        response => {
          console.log(response)
        }
      );
      {
        // this.httpClient.post(`${this.fbUrl}item.json`,
        //   {
        //     dishName: this.dish,
        //     dishPrice: this.price
        //   }
        // ).subscribe(
        //   (response) => {
        //     console.log(response)
        //   }
        // )
      }
    }
    this.editMode = false;
    this.itemForm.reset()
  }

  clearForm() {
    this.editMode = false;
    this.itemForm.reset();
  }

  deleteItem() {
    this.shoppingListService.deleteItem().subscribe(
      response => console.log(response)

    )
    this.clearForm();
    this.itemIndex = null;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }


}