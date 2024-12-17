import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../../components/ui/Button';
import { BookClassModal } from '../../components/schedule/BookClassModal';
import type { ClassSchedule } from '../../types/schedule';

const mockSchedule: ClassSchedule[] = [
  {
    id: '1',
    title: 'Morning Yoga',
    trainer: 'Sarah Smith',
    startTime: '2024-03-10T08:00:00',
    endTime: '2024-03-10T09:00:00',
    capacity: 20,
    enrolled: 15,
    type: 'yoga'
  },
  {
    id: '2',
    title: 'HIIT Workout',
    trainer: 'Mike Johnson',
    startTime: '2024-03-10T10:00:00',
    endTime: '2024-03-10T11:00:00',
    capacity: 15,
    enrolled: 12,
    type: 'hiit'
  }
];

export function Schedule() {
  const [classes] = useState<ClassSchedule[]>(mockSchedule);
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookClass = (classItem: ClassSchedule) => {
    setSelectedClass(classItem);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Class Schedule</h1>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          View Calendar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg shadow-sm p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {classItem.title}
                </h3>
                <p className="text-sm text-gray-500">{classItem.trainer}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {classItem.type}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                {format(new Date(classItem.startTime), 'h:mm a')} -{' '}
                {format(new Date(classItem.endTime), 'h:mm a')}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-2 h-4 w-4" />
                {classItem.enrolled} / {classItem.capacity} spots filled
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              disabled={classItem.enrolled >= classItem.capacity}
              onClick={() => handleBookClass(classItem)}
            >
              {classItem.enrolled >= classItem.capacity
                ? 'Class Full'
                : 'Book Now'}
            </Button>
          </div>
        ))}
      </div>

      {selectedClass && (
        <BookClassModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedClass(null);
          }}
          classItem={selectedClass}
        />
      )}
    </div>
  );
}