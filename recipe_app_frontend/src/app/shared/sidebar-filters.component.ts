import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="surface" role="complementary" aria-label="Filters" style="padding:1rem; display:none;">
      <!-- Placeholder for future filters -->
      <h2 style="font-size:0.95rem; margin-bottom:0.5rem;">Filters</h2>
      <p style="color:#6b7280; font-size:0.85rem;">Coming soon</p>
    </aside>
  `
})
export class SidebarFiltersComponent {}
