import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const mealSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  calories: z.number().min(0, 'Invalid calories'),
  protein: z.number().min(0, 'Invalid protein'),
  carbs: z.number().min(0, 'Invalid carbs'),
  fats: z.number().min(0, 'Invalid fats'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  instructions: z.string().optional(),
});

const dietPlanSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['weight-loss', 'muscle-gain', 'maintenance']),
  meals: z.array(mealSchema).min(1, 'At least one meal is required'),
});

type DietPlanForm = z.infer<typeof dietPlanSchema>;

interface CreateDietPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDietPlanModal({ isOpen, onClose }: CreateDietPlanModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit, formState: { errors } } = useForm<DietPlanForm>({
    resolver: zodResolver(dietPlanSchema),
    defaultValues: {
      meals: [{
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        ingredients: [''],
        instructions: ''
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meals',
  });

  const onSubmit = async (data: DietPlanForm) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Creating diet plan:', data);
      onClose();
    } catch (error) {
      console.error('Error creating diet plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Diet Plan">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register('title')}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Plan Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Meals</label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Meal {index + 1}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <input
                    {...register(`meals.${index}.name`)}
                    placeholder="Meal name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      {...register(`meals.${index}.calories`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Calories"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      {...register(`meals.${index}.protein`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Protein (g)"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      {...register(`meals.${index}.carbs`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Carbs (g)"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      {...register(`meals.${index}.fats`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Fats (g)"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <textarea
                    {...register(`meals.${index}.instructions`)}
                    placeholder="Instructions"
                    rows={2}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => append({
              name: '',
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              ingredients: [''],
              instructions: ''
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}