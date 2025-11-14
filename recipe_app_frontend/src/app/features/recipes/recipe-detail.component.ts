import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeService } from '../../core/recipe.service';
import { Recipe } from '../../core/recipe.model';

@Component({
  standalone: true,
  selector: 'app-recipe-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="container" *ngIf="loading" aria-busy="true">
      <div class="surface skeleton" style="height: 220px; margin-bottom:1rem;"></div>
      <div class="surface skeleton" style="height: 320px;"></div>
    </section>

    <section class="container" *ngIf="!loading && recipe">
      <div class="surface" style="overflow:hidden; border:1px solid #e5e7eb;">
        <div style="position:relative; aspect-ratio: 16/7; background:#e5e7eb;">
          <img *ngIf="recipe.imageUrl" [src]="recipe.imageUrl" [alt]="recipe.title + ' hero image'" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div style="padding:1rem 1.25rem;">
          <h1 style="font-size:1.5rem; margin-bottom:0.25rem;">{{ recipe.title }}</h1>
          <p style="color:#6b7280; margin-bottom:0.75rem;">{{ recipe.description }}</p>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:0.75rem;">
            <span *ngIf="recipe.prepTimeMinutes" class="badge" title="Prep time">{{ recipe.prepTimeMinutes }}m prep</span>
            <span *ngIf="recipe.cookTimeMinutes" class="badge" title="Cook time">{{ recipe.cookTimeMinutes }}m cook</span>
            <span *ngFor="let t of (recipe.tags || [])" class="badge">{{ t }}</span>
          </div>

          <div style="display:grid; grid-template-columns: 1fr; gap: 1rem;">
            <div class="surface" style="padding:1rem; border:1px solid #e5e7eb;">
              <h2 style="font-size:1.1rem; margin-bottom:0.5rem;">Ingredients</h2>
              <ul>
                <li *ngFor="let i of recipe.ingredients" style="margin:0.25rem 0;">{{ i }}</li>
              </ul>
            </div>

            <div class="surface" style="padding:1rem; border:1px solid #e5e7eb;">
              <h2 style="font-size:1.1rem; margin-bottom:0.5rem;">Instructions</h2>
              <ol>
                <li *ngFor="let step of recipe.instructions; let idx = index" style="margin:0.45rem 0;">
                  <strong>Step {{ idx + 1 }}:</strong> {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <p style="margin-top:0.75rem;">
        <a routerLink="/" class="button ghost">← Back to list</a>
      </p>
    </section>

    <section class="container" *ngIf="!loading && !recipe">
      <div class="surface" style="padding:1.5rem; text-align:center;">
        <p style="color:#6b7280;">Recipe not found.</p>
        <p><a routerLink="/" class="button ghost">Go back</a></p>
      </div>
    </section>
  `
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(RecipeService);

  recipe?: Recipe;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.service.getRecipe(id).subscribe({
      next: (r) => { this.recipe = r; this.loading = false; },
      error: () => { this.recipe = undefined; this.loading = false; }
    });
  }
}
