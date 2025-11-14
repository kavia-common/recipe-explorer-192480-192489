import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../core/recipe.service';
import { Recipe } from '../../core/recipe.model';
import { RecipeCardComponent } from './recipe.card.component';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule, FormsModule, RecipeCardComponent],
  template: `
    <section class="container">
      <div class="surface" style="padding:1rem; margin-bottom:1rem; background:linear-gradient(180deg, rgba(37,99,235,0.05), rgba(255,255,255,1)); border:1px solid #e5e7eb;">
        <form (submit)="$event.preventDefault()" style="display:flex; gap:0.5rem; align-items:center;">
          <label for="q" class="visually-hidden">Search</label>
          <input id="q" class="input" [(ngModel)]="query" name="q" placeholder="Search recipes…" (ngModelChange)="onQueryChange()" />
          <button class="button" type="button" (click)="applySearch()">Search</button>
          <button class="button ghost" type="button" (click)="clear()">Clear</button>
        </form>
      </div>

      <div *ngIf="loading" class="grid" aria-live="polite" aria-busy="true">
        <div *ngFor="let s of [1,2,3,4,5,6]" class="surface skeleton" style="height: 260px;"></div>
      </div>

      <div *ngIf="!loading && recipes?.length" class="grid">
        <app-recipe-card *ngFor="let r of recipes" [recipe]="r"></app-recipe-card>
      </div>

      <div *ngIf="!loading && !recipes?.length" class="surface" style="padding:1.5rem; text-align:center;">
        <p style="color:#6b7280;">No recipes found. Try a different search.</p>
      </div>
    </section>
  `
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private service = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  recipes: Recipe[] = [];
  query = '';
  loading = true;

  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((p: Params) => {
      const q = (p['q'] ?? '') as string;
      this.query = q;
      this.fetch();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private fetch() {
    this.loading = true;
    this.service.listRecipes({ search: this.query }).subscribe({
      next: (recipes) => { this.recipes = recipes; this.loading = false; },
      error: () => { this.recipes = []; this.loading = false; }
    });
  }

  onQueryChange() {
    // optional debounce; for simplicity we update URL on button press only
  }

  applySearch() {
    this.router.navigate([], { queryParams: { q: this.query || null }, queryParamsHandling: 'merge' });
  }

  clear() {
    this.query = '';
    this.applySearch();
  }
}
