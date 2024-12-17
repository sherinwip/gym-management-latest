import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CreateWorkoutModal } from '../../components/workouts/CreateWorkoutModal';
import type { WorkoutPlan } from '../../types/workout';

const mockWorkouts: WorkoutPlan[] = [
  {
    id: '1',
    title: 'Full Body Strength',
    description: 'Complete full body workout focusing on major muscle groups',
    difficulty: 'intermediate',
    exercises: [
      {
        id: 'e1',
        name: 'Squats',
        sets: 4,
        reps: 12,
        weight: 100
      },
      {
        id: 'e2',
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 135
      }
    ],
    createdBy: 'Sarah Smith',
    targetMuscles: ['legs', 'chest', 'shoulders']
  }
];

export function Workouts() {
  const [workouts] = useState<WorkoutPlan[]>(mockWorkouts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Workout Plans</h1>
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
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {workout.title}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                  {workout.difficulty}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{workout.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Exercises:</h4>
              <ul className="mt-2 space-y-2">
                {workout.exercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="text-sm text-gray-600 flex justify-between"
                  >
                    <span>{exercise.name}</span>
                    <span>
                      {exercise.sets}x{exercise.reps}{' '}
                      {exercise.weight && `@ ${exercise.weight}lbs`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex gap-2">
              {workout.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Created by {workout.createdBy}
              </span>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateWorkoutModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}