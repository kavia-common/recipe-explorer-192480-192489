# Recipe Explorer (Angular)

A modern, responsive Angular UI for browsing, searching, and viewing recipe details. Styled with the Ocean Professional palette.

## Run locally

```bash
npm install
npm start
```

App runs at http://localhost:3000 (configured in angular.json).

## Data sources

This frontend supports two data modes:

1) API mode (HTTP)
- Set one of these environment variables for the container:
  - NG_APP_API_BASE
  - NG_APP_BACKEND_URL
- Example: `NG_APP_API_BASE=https://api.example.com`
- Expected endpoints:
  - GET {API_BASE}/recipes -> Recipe[]
  - GET {API_BASE}/recipes/:id -> Recipe

2) Mock mode (default)
- If no env var is provided, the app uses a local mock dataset.
- Useful for development without a backend.

Switching is automatic and decided at runtime based on the presence of NG_APP_API_BASE or NG_APP_BACKEND_URL (available via window or process.env if provided by the environment).

## Features

- Home list: card-based responsive grid with images, title, description and tags
- Search: top bar and on-page search
- Recipe details: hero image, ingredients, instructions, and times
- Accessibility: alt text, landmarks, keyboard-friendly components
- Loading skeletons and empty states

## Project structure (key files)
- src/app/shared/navbar.component.ts        Top navigation with search
- src/app/shared/sidebar-filters.component.ts  Placeholder for filters
- src/app/features/recipes/recipe-list.component.ts  List page
- src/app/features/recipes/recipe-detail.component.ts Detail page
- src/app/features/recipes/recipe.card.component.ts  Card component
- src/app/core/recipe.model.ts              Types
- src/app/core/recipe.service.ts            API/Mock switching service
- src/app/core/recipes.mock.ts              Local mock data

## Styling

Global CSS variables are defined in src/styles.css and apply the Ocean Professional palette:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Use the utility classes `.surface`, `.badge`, `.button`, `.input`, `.grid`, and `.skeleton` for consistent styling.

## Notes

- To expose env vars at runtime in some environments, you can inject them into `window`:
  ```html
  <script>
    window.NG_APP_API_BASE = 'https://api.example.com';
  </script>
  ```
- The app is SSR-ready via @angular/ssr and Express setup in src/server.ts.
