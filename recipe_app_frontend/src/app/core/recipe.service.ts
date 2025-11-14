import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { Recipe } from './recipe.model';
import { MOCK_RECIPES } from './recipes.mock';

export interface RecipeQuery {
  search?: string;
  tags?: string[];
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
/** RecipeService resolves to either HTTP-backed or mock data based on env. */
export class RecipeService {
  private http = inject(HttpClient);

  private get apiBase(): string | null {
    // Respect both possible envs if provided at build/runtime via process.env replacement or platform config
    // Angular does not expose process.env by default; we rely on window for runtime overrides if available.
    const win = globalThis as any;
    const fromWindow = (win.NG_APP_API_BASE || win.NG_APP_BACKEND_URL) as string | undefined;
    const fromProcess = (typeof process !== 'undefined' && (process as any)?.env) ? ((process as any).env.NG_APP_API_BASE || (process as any).env.NG_APP_BACKEND_URL) : undefined;
    return fromWindow ?? fromProcess ?? null;
  }

  private get useHttp(): boolean {
    return !!this.apiBase;
  }

  // PUBLIC_INTERFACE
  /** List recipes with optional search and tag filters. */
  listRecipes(query?: RecipeQuery): Observable<Recipe[]> {
    if (this.useHttp) {
      // Use a safe URLSearchParams reference or fallback
      const USP: any = (typeof globalThis !== 'undefined' && (globalThis as any).URLSearchParams)
        ? (globalThis as any).URLSearchParams
        : class {
            private map = new Map<string, string>();
            set(k: string, v: string) { this.map.set(k, v); }
            toString() { return Array.from(this.map.entries()).map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&'); }
          };
      const q = new USP();
      if (query?.search) q.set('search', query.search);
      if (query?.tags?.length) q.set('tags', query.tags.join(','));
      const qs = q.toString();
      const base = this.apiBase?.replace(/\/+$/, '') ?? '';
      const url = `${base}/recipes${qs ? `?${qs}` : ''}`;
      return this.http.get<Recipe[]>(url);
    }
    // Mock fallback with simple filtering
    const term = (query?.search ?? '').toLowerCase().trim();
    const tags = query?.tags ?? [];
    const filtered = MOCK_RECIPES.filter(r => {
      const matchTerm = !term || r.title.toLowerCase().includes(term) || (r.description ?? '').toLowerCase().includes(term) || (r.tags ?? []).some(t => t.toLowerCase().includes(term));
      const matchTags = tags.length === 0 || (r.tags ?? []).some(t => tags.includes(t));
      return matchTerm && matchTags;
    });
    return of(filtered).pipe(delay(200));
  }

  // PUBLIC_INTERFACE
  /** Get a single recipe by id. */
  getRecipe(id: string): Observable<Recipe | undefined> {
    if (this.useHttp) {
      const url = `${this.apiBase}/recipes/${encodeURIComponent(id)}`;
      return this.http.get<Recipe>(url);
    }
    const recipe = MOCK_RECIPES.find(r => r.id === id);
    return of(recipe).pipe(delay(150));
  }
}
