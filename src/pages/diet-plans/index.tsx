import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CreateDietPlanModal } from '../../components/diet/CreateDietPlanModal';
import type { DietPlan } from '../../types/diet';

const mockDietPlans: DietPlan[] = [
  {
    id: '1',
    title: 'Weight Loss Meal Plan',
    description: 'A balanced meal plan designed for healthy weight loss',
    type: 'weight-loss',
    meals: [
      {
        id: 'm1',
        name: 'Breakfast Bowl',
        calories: 350,
        protein: 20,
        carbs: 45,
        fats: 12,
        ingredients: ['Oats', 'Banana', 'Almond Milk', 'Chia Seeds']
      }
    ],
    createdBy: 'Sarah Smith',
    totalCalories: 1800
  }
];

export function DietPlans() {
  const [dietPlans] = useState<DietPlan[]>(mockDietPlans);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Diet Plans</h1>
        <div className="flex gap-4">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dietPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.title}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                  {plan.type.replace('-', ' ')}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Daily Meals:</h4>
              <ul className="mt-2 space-y-3">
                {plan.meals.map((meal) => (
                  <li key={meal.id} className="text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">
                        {meal.name}
                      </span>
                      <span className="text-gray-500">
                        {meal.calories} calories
                      </span>
                    </div>
                    <div className="mt-1 flex gap-4 text-xs text-gray-500">
                      <span>Protein: {meal.protein}g</span>
                      <span>Carbs: {meal.carbs}g</span>
                      <span>Fats: {meal.fats}g</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  Created by {plan.createdBy}
                </span>
                <span className="font-medium">
                  Total: {plan.totalCalories} cal/day
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View Full Plan
            </Button>
          </div>
        ))}
      </div>

      <CreateDietPlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}