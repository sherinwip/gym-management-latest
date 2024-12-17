import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface DietPlanFilterProps {
  onFilterChange: (filters: DietPlanFilters) => void;
}

export interface DietPlanFilters {
  search: string;
  type: string;
  calorieRange: string;
}

export function DietPlanFilter({ onFilterChange }: DietPlanFilterProps) {
  const [filters, setFilters] = useState<DietPlanFilters>({
    search: '',
    type: 'all',
    calorieRange: 'all'
  });

  const handleFilterChange = (key: keyof DietPlanFilters, value: string) => {
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
          placeholder="Search diet plans..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plan Type
        </label>
        <div className="flex gap-2">
          {['all', 'weight-loss', 'muscle-gain', 'maintenance'].map((type) => (
            <Button
              key={type}
              variant={filters.type === type ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('type', type)}
            >
              {type.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calorie Range
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All', value: 'all' },
            { label: 'Under 1500', value: '<1500' },
            { label: '1500-2000', value: '1500-2000' },
            { label: '2000-2500', value: '2000-2500' },
            { label: 'Over 2500', value: '>2500' }
          ].map((range) => (
            <Button
              key={range.value}
              variant={filters.calorieRange === range.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('calorieRange', range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}