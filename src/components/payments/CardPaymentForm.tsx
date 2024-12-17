import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import type { CardDetails } from '../../types/payment';

const cardSchema = z.object({
  number: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
  expYear: z.string().regex(/^\d{2}$/, 'Invalid year'),
  cvc: z.string().regex(/^\d{3}$/, 'Invalid CVC'),
  name: z.string().min(1, 'Name is required'),
});

interface CardPaymentFormProps {
  onSubmit: (data: CardDetails) => void;
  isProcessing: boolean;
}

export function CardPaymentForm({ onSubmit, isProcessing }: CardPaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardDetails>({
    resolver: zodResolver(cardSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Cardholder Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          {...register('number')}
          type="text"
          maxLength={16}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="1234 5678 9012 3456"
        />
        {errors.number && (
          <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700">
            Month
          </label>
          <input
            {...register('expMonth')}
            type="text"
            maxLength={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="MM"
          />
          {errors.expMonth && (
            <p className="mt-1 text-sm text-red-600">{errors.expMonth.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="expYear" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            {...register('expYear')}
            type="text"
            maxLength={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="YY"
          />
          {errors.expYear && (
            <p className="mt-1 text-sm text-red-600">{errors.expYear.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            {...register('cvc')}
            type="text"
            maxLength={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="123"
          />
          {errors.cvc && (
            <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
}