import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Button } from '../ui/Button';
import type { ClassSchedule } from '../../types/schedule';

interface CalendarProps {
  classes: ClassSchedule[];
  onClassSelect: (classItem: ClassSchedule) => void;
}

export function Calendar({ classes, onClassSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getClassesForDate = (date: Date) => {
    return classes.filter((classItem) =>
      isSameDay(new Date(classItem.startTime), date)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(addDays(currentDate, -7))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(addDays(currentDate, 7))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {weekDays.map((date) => (
          <div key={date.toString()} className="bg-white">
            <div className="py-2 px-3 text-center border-b">
              <div className="text-sm font-medium text-gray-900">
                {format(date, 'EEE')}
              </div>
              <div className="mt-1 text-lg font-semibold">
                {format(date, 'd')}
              </div>
            </div>
            <div className="px-2 py-2 space-y-1 min-h-[150px]">
              {getClassesForDate(date).map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => onClassSelect(classItem)}
                  className="w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="font-medium text-gray-900">
                    {classItem.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(classItem.startTime), 'h:mm a')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}