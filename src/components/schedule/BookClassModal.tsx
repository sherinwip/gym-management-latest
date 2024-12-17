import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { ClassSchedule } from '../../types/schedule';

const bookingSchema = z.object({
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassSchedule;
}

export function BookClassModal({ isOpen, onClose, classItem }: BookClassModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingForm) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking class:', { classItem, ...data });
      onClose();
    } catch (error) {
      console.error('Error booking class:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Class">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">{classItem.title}</h3>
          <p className="text-sm text-gray-500">with {classItem.trainer}</p>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            {...register('notes')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={3}
            placeholder="Any special requirements or notes..."
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}