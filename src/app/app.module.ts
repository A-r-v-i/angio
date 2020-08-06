import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

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

//pipes
import { ShortenPipe } from './shared/pipes/shotern.pipe';

//services
import { AuthGuard } from './shared/services/auth-guard-service'; //auth middleware tells whether the app is authenticated or not and navigate acc. to it 
import { AuthService } from './shared/services/auth-service'; //auth service which returns the boolean value for authentication. returns true if logged in else false to auth gaurad service
import { ShoppingList } from './shared/services/shoppingList.service';

//interceptors
import { AuthInterceptorService } from './shared/interceptors/auth-interceptors-service';

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
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ShoppingList,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
