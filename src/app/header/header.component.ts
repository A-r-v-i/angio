import { Component } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private recipeService: RecipeService) { }

  onSaveRecipe() {
    this.recipeService.saveRecipe()
  }
}
