import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CardPaymentForm } from './CardPaymentForm';
import { UPIPaymentForm } from './UPIPaymentForm';
import { AdminPaymentForm } from './AdminPaymentForm';
import { processPayment } from '../../lib/payment';
import { useAuthStore } from '../../store/auth';
import type { PaymentMethod, CardDetails } from '../../types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  description,
  onSuccess,
  onError,
}: PaymentModalProps) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = async (data: CardDetails) => {
    try {
      setIsProcessing(true);
      const response = await processPayment(amount, 'USD', 'card', data);
      
      if (response.success && response.transactionId) {
        onSuccess(response.transactionId);
        onClose();
      } else {
        onError(response.error || 'Payment failed');
      }
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUPIPayment = async (data: { upiId: string }) => {
    try {
      setIsProcessing(true);
      const response = await processPayment(amount, 'USD', 'upi', {
        id: data.upiId,
        provider: 'upi'
      });
      
      if (response.success && response.transactionId) {
        onSuccess(response.transactionId);
        onClose();
      } else {
        onError(response.error || 'Payment failed');
      }
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdminPayment = async (data: any) => {
    try {
      setIsProcessing(true);
      // Simulate API call to record cash payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transactionId = `cash_${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(transactionId);
      onClose();
    } catch (error) {
      onError('Failed to record payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isAdmin && selectedMethod === 'cash') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Record Cash Payment">
        <AdminPaymentForm
          onSubmit={handleAdminPayment}
          isProcessing={isProcessing}
        />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Make Payment">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">${amount}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Select Payment Method
          </h3>
          <PaymentMethodSelector
            onSelect={setSelectedMethod}
            selectedMethod={selectedMethod}
          />
        </div>

        {selectedMethod && (
          <div className="mt-6">
            {(selectedMethod === 'credit_card' || selectedMethod === 'debit_card') && (
              <CardPaymentForm
                onSubmit={handleCardPayment}
                isProcessing={isProcessing}
              />
            )}
            {selectedMethod === 'upi' && (
              <UPIPaymentForm
                onSubmit={handleUPIPayment}
                isProcessing={isProcessing}
              />
            )}
            {selectedMethod === 'cash' && !isAdmin && (
              <div className="text-center text-sm text-gray-500">
                Please visit the front desk to make a cash payment.
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}