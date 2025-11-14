import { Recipe } from './recipe.model';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Grilled Chicken',
    description: 'Juicy chicken breasts marinated with lemon, garlic, and herbs.',
    imageUrl: 'https://images.unsplash.com/photo-1604908554063-c7cccbdd0a40?q=80&w=1200&auto=format&fit=crop',
    tags: ['chicken', 'grill', 'quick'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    ingredients: [
      '2 chicken breasts',
      '2 tbsp olive oil',
      '1 lemon (zest and juice)',
      '2 cloves garlic (minced)',
      '1 tsp dried oregano',
      'Salt and pepper'
    ],
    instructions: [
      'Whisk olive oil, lemon zest and juice, garlic, and oregano.',
      'Marinate chicken for at least 15 minutes.',
      'Grill over medium-high heat 6–8 minutes per side until cooked through.',
      'Rest 5 minutes and serve.'
    ]
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    description: 'Rich and velvety mushroom sauce tossed with al dente pasta.',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    tags: ['pasta', 'vegetarian', 'comfort'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    ingredients: [
      '200g pasta',
      '250g mushrooms (sliced)',
      '1 small onion (diced)',
      '2 cloves garlic (minced)',
      '200ml cream',
      'Parmesan, parsley, salt, pepper'
    ],
    instructions: [
      'Cook pasta according to package instructions.',
      'Sauté onion and mushrooms until golden; add garlic.',
      'Pour in cream; simmer until thickened. Season.',
      'Toss with pasta and garnish with Parmesan and parsley.'
    ]
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    description: 'Classic brunch toast with creamy avocado and a runny egg.',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    tags: ['breakfast', 'quick', 'healthy'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    ingredients: [
      '2 slices sourdough',
      '1 ripe avocado',
      '1 egg',
      'Chili flakes, lemon, salt, pepper'
    ],
    instructions: [
      'Toast bread; mash avocado with lemon, salt, and pepper.',
      'Poach egg 3–4 minutes.',
      'Spread avocado on toast; top with egg and chili flakes.'
    ]
  }
];
