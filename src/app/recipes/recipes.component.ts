import { Component, OnInit } from '@angular/core';

import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from './../shared/services/recipe.service';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService, private authServie: AuthService) { }

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe
      }
    )
  }

  login() {
    this.authServie.login();
  }

  logout() {
    this.authServie.logout()
  }


}
