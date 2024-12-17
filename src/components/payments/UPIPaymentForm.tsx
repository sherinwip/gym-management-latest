import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';

const upiSchema = z.object({
  upiId: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/, 'Invalid UPI ID'),
});

interface UPIPaymentFormProps {
  onSubmit: (data: { upiId: string }) => void;
  isProcessing: boolean;
}

export function UPIPaymentForm({ onSubmit, isProcessing }: UPIPaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(upiSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
          UPI ID
        </label>
        <input
          {...register('upiId')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="username@upi"
        />
        {errors.upiId && (
          <p className="mt-1 text-sm text-red-600">{errors.upiId.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}