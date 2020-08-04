import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { RecipesComponent } from './recipes/recipes.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { ErrorPageComponent } from './error-page/error-page.component'
import { RecipePreloadComponent } from './recipes/recipe-preload/recipe-preload.component'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AuthGuard } from './shared/services/auth-guard-service'



const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipePreloadComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ]
  },
  // { path: 'shoppinglist', canActivate: [AuthGuard], component: ShoppingListComponent },
  { path: 'shoppinglist', component: ShoppingListComponent },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  imports: [
    //RouterModule.forRoot(routes, { useHash: true })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}