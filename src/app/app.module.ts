import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component'; //main app
import { HeaderComponent } from './header/header.component'; //main header 
import { AppRoutingModule } from './app-routing-module'; //routing


//components
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipePreloadComponent } from './recipes/recipe-preload/recipe-preload.component'; 
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

//services
import { AuthGuard } from './auth-guard-service'; //auth middleware tells whether the app is authenticated or not and navigate acc. to it 
import { AuthService } from './auth-service'; //auth service which returns the boolean value for authentication. returns true if logged in else false to auth gaurad service
import { ShoppingList } from './shared/services/shoppingList.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    ErrorPageComponent,
    RecipePreloadComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingList, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
