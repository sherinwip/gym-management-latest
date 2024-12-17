export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions?: string;
}

export interface DietPlan {
  id: string;
  title: string;
  description: string;
  type: 'weight-loss' | 'muscle-gain' | 'maintenance';
  meals: Meal[];
  createdBy: string;
  totalCalories: number;
}