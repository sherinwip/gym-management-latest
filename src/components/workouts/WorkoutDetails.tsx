import { Fragment } from 'react';
import { X, Clock, Dumbbell, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import type { WorkoutPlan } from '../../types/workout';

interface WorkoutDetailsProps {
  workout: WorkoutPlan;
  onClose: () => void;
}

export function WorkoutDetails({ workout, onClose }: WorkoutDetailsProps) {
  return (
    <Fragment>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Workout Details
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {workout.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {workout.description}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                  {workout.difficulty}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Estimated duration: 45-60 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Dumbbell className="h-4 w-4" />
                <span>{workout.exercises.length} exercises</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Target className="h-4 w-4" />
                <div className="flex gap-2">
                  {workout.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Exercise List
              </h4>
              <div className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="bg-gray-50 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">
                          {index + 1}. {exercise.name}
                        </h5>
                        {exercise.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            {exercise.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.weight && ` @ ${exercise.weight}lbs`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Created by {workout.createdBy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}