import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ClassSchedule } from '../../types/schedule';

interface UpcomingClassesProps {
  classes: ClassSchedule[];
  onBookClass: (classItem: ClassSchedule) => void;
}

export function UpcomingClasses({ classes, onBookClass }: UpcomingClassesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Classes</h3>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {classes.map((classItem) => (
              <li key={classItem.id} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {classItem.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(classItem.startTime), 'MMM d, h:mm a')} with {classItem.trainer}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onBookClass(classItem)}
                      disabled={classItem.enrolled >= classItem.capacity}
                    >
                      {classItem.enrolled >= classItem.capacity ? 'Full' : 'Book'}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}