import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="surface" role="banner" style="position: sticky; top: 0; z-index: 10;">
      <div class="container" style="display:flex; align-items:center; gap:1rem; padding: 0.75rem 1rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <div aria-hidden="true" style="width:36px; height:36px; border-radius:10px; background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(245,158,11,0.15)); display:flex; align-items:center; justify-content:center;">
            <span style="color:var(--color-primary); font-weight:700;">R</span>
          </div>
          <a routerLink="/" class="brand" style="font-weight:700; color:var(--color-text); text-decoration:none;">Recipe Explorer</a>
        </div>
        <div style="flex:1;"></div>
        <form (submit)="$event.preventDefault()" role="search" aria-label="Search recipes" style="display:flex; gap:0.5rem; width:min(520px, 100%);">
          <input class="input" type="search" [(ngModel)]="query" name="q" placeholder="Search recipes, ingredients, tags…" (ngModelChange)="onChange()" aria-label="Search recipes" />
          <button class="button" type="button" (click)="onSubmit()" aria-label="Search">Search</button>
        </form>
      </div>
    </header>
  `,
  styles: [``]
})
export class NavBarComponent {
  @Output() search = new EventEmitter<string>();
  query = '';

  // PUBLIC_INTERFACE
  /** Emits search query string to parent listeners. */
  onSubmit() {
    this.search.emit(this.query.trim());
  }

  onChange() {
    // Debounce could be added; for now emit immediate to simplify
    this.search.emit(this.query.trim());
  }
}
