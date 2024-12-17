import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface WorkoutFilterProps {
  onFilterChange: (filters: WorkoutFilters) => void;
}

export interface WorkoutFilters {
  search: string;
  difficulty: string;
  muscle: string;
}

const muscleGroups = [
  'all',
  'chest',
  'back',
  'legs',
  'shoulders',
  'arms',
  'core'
];

export function WorkoutFilter({ onFilterChange }: WorkoutFilterProps) {
  const [filters, setFilters] = useState<WorkoutFilters>({
    search: '',
    difficulty: 'all',
    muscle: 'all'
  });

  const handleFilterChange = (key: keyof WorkoutFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search workouts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty
        </label>
        <div className="flex gap-2">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <Button
              key={level}
              variant={filters.difficulty === level ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('difficulty', level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Muscle
        </label>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((muscle) => (
            <Button
              key={muscle}
              variant={filters.muscle === muscle ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('muscle', muscle)}
            >
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}