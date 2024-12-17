import { Fragment } from 'react';
import { X, Utensils } from 'lucide-react';
import { Button } from '../ui/Button';
import type { DietPlan } from '../../types/diet';

interface DietPlanDetailsProps {
  plan: DietPlan;
  onClose: () => void;
}

export function DietPlanDetails({ plan, onClose }: DietPlanDetailsProps) {
  return (
    <Fragment>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Diet Plan Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                  {plan.type.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Utensils className="h-4 w-4" />
              <span>Total Daily Calories: {plan.totalCalories} kcal</span>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Daily Meals</h4>
              <div className="space-y-4">
                {plan.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="bg-gray-50 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-medium text-gray-900">
                        {meal.name}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {meal.calories} calories
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Protein:</span>
                        <span className="ml-2 font-medium">{meal.protein}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Carbs:</span>
                        <span className="ml-2 font-medium">{meal.carbs}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fats:</span>
                        <span className="ml-2 font-medium">{meal.fats}g</span>
                      </div>
                    </div>

                    <div>
                      <h6 className="text-sm font-medium text-gray-900 mb-2">
                        Ingredients
                      </h6>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {meal.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    {meal.instructions && (
                      <div>
                        <h6 className="text-sm font-medium text-gray-900 mb-2">
                          Instructions
                        </h6>
                        <p className="text-sm text-gray-600">{meal.instructions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">Created by {plan.createdBy}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}