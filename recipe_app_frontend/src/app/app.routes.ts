import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipes/recipe-list.component';
import { RecipeDetailComponent } from './features/recipes/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent, title: 'Recipes' },
  { path: 'recipe/:id', component: RecipeDetailComponent, title: 'Recipe Details' },
  { path: '**', redirectTo: '' }
];
