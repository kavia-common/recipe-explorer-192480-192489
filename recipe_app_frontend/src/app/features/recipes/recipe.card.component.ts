import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../core/recipe.model';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card',
  imports: [CommonModule, RouterModule],
  template: `
    <article class="surface" [routerLink]="['/recipe', recipe.id]" style="cursor:pointer; overflow:hidden; border:1px solid #e5e7eb; transition: transform var(--transition), box-shadow var(--transition);">
      <div style="position:relative; aspect-ratio: 16/9; background:#e5e7eb; overflow:hidden;">
        <img *ngIf="recipe.imageUrl" [src]="recipe.imageUrl" [alt]="recipe.title + ' image'" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div style="padding:0.9rem;">
        <h3 style="font-size:1.05rem; margin-bottom:0.35rem;">{{ recipe.title }}</h3>
        <p style="color:#6b7280; font-size:0.9rem; margin-bottom:0.5rem;">{{ recipe.description }}</p>
        <div>
          <span *ngFor="let t of (recipe.tags || [])" class="badge">{{ t }}</span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    article:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
  `]
})
export class RecipeCardComponent {
  // PUBLIC_INTERFACE
  /** Recipe displayed by the card (required). */
  @Input({ required: true }) recipe!: Recipe;
}
