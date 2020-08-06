import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  url = environment.fbUrl;

  recipeForm: FormGroup;

  // @ViewChild('form') recipeForm: NgForm;

  valid: boolean = false;
  id: number;
  editMode: boolean = false;
  typeOfFood = 'chetinad';
  existingDishes = ['upma', 'coco chutney'];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.existingDish.bind(this)]),
      'description': new FormControl(null, [Validators.minLength(10), Validators.required]),
      'dish': new FormControl('default', null, this.existingDishType)
    })

    this.recipeForm.setValue({
      'name': '',
      'description': '',
      'dish': 'default'
    })
  }

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
    // this.http.post(this.url+'recipe.json', {})
    console.log(this.recipeForm)
    this.recipeForm.reset()
  }

}
