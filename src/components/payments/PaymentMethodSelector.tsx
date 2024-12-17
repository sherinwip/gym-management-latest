import { useState } from 'react';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import type { PaymentMethod } from '../../types/payment';

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  selectedMethod?: PaymentMethod;
}

export function PaymentMethodSelector({ onSelect, selectedMethod }: PaymentMethodSelectorProps) {
  const methods: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
    { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
    { id: 'debit_card', label: 'Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'cash', label: 'Cash', icon: DollarSign },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {methods.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={selectedMethod === id ? 'primary' : 'outline'}
          className="h-24 flex-col gap-2"
          onClick={() => onSelect(id)}
        >
          <Icon className="h-6 w-6" />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  );
}