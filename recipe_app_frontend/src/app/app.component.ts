import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // PUBLIC_INTERFACE
  /** Root app component hosting the layout: top nav and routed views. */
  title = 'Recipe Explorer';
  private router = inject(Router);

  // PUBLIC_INTERFACE
  /** Handle search events from the navbar by updating the query param on the list route. */
  onSearch(term: string) {
    this.router.navigate(['/'], { queryParams: { q: term || null } });
  }
}
