import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;

  // @ViewChild('form') recipeForm: NgForm;

  valid: boolean = false;
  id: number;
  editMode: boolean = false;
  typeOfFood = 'chetinad';
  existingDishes = ['upma', 'coco chutney'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.existingDish.bind(this)]),
      'description': new FormControl(null, [Validators.minLength(10), Validators.required]),
      'dish': new FormControl('default', null, this.existingDishType)
    })

    this.recipeForm.statusChanges.subscribe(
      (status) => { console.log(status) }
    )
    this.recipeForm.setValue({
      'name': 'Enter your fav dish',
      'description': 'Say some intresting facts about the dish',
      'dish': 'default'
    })
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       this.editMode = params['id'] != null;
    //     }
    //   )

    // this.valid = (this.recipeForm.form.status) === "valid" ? true : false;
    // console.log(this.editMode)
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  existingDish(control: FormControl): { [s: string]: boolean } {
    if (this.existingDishes.indexOf(control.value) !== -1) {
      return { 'dishExist': true }
    }
    return null;
  }

  existingDishType(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'chinese') {
          resolve({ 'existingDish': true });
        }
        else {
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    // console.log(this.recipeForm.form.status);
    console.log(this.recipeForm)
  }

}
