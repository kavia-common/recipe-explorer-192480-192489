export interface Recipe {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  ingredients: string[];
  instructions: string[];
}
