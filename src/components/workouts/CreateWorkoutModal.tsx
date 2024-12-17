import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const exerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.number().min(1, 'Minimum 1 set required'),
  reps: z.number().min(1, 'Minimum 1 rep required'),
  weight: z.number().optional(),
  notes: z.string().optional(),
});

const workoutSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  exercises: z.array(exerciseSchema).min(1, 'At least one exercise is required'),
  targetMuscles: z.array(z.string()).min(1, 'Select at least one target muscle'),
});

type WorkoutForm = z.infer<typeof workoutSchema>;

interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkoutModal({ isOpen, onClose }: CreateWorkoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, control, handleSubmit, formState: { errors } } = useForm<WorkoutForm>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      exercises: [{ name: '', sets: 3, reps: 10 }],
      targetMuscles: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const onSubmit = async (data: WorkoutForm) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Creating workout plan:', data);
      onClose();
    } catch (error) {
      console.error('Error creating workout plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Workout Plan">
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
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            {...register('difficulty')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercises</label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start">
                <div className="flex-1 space-y-3">
                  <input
                    {...register(`exercises.${index}.name`)}
                    placeholder="Exercise name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="flex gap-3">
                    <input
                      {...register(`exercises.${index}.sets`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Sets"
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      {...register(`exercises.${index}.reps`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Reps"
                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    <input
                      {...register(`exercises.${index}.weight`, { valueAsNumber: true })}
                      type="number"
                      placeholder="Weight (lbs)"
                      className="block w-28 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => append({ name: '', sets: 3, reps: 10 })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
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