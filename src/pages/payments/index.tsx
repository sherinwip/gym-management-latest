import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PaymentModal } from '../../components/payments/PaymentModal';
import { PaymentHistory } from '../../components/payments/PaymentHistory';
import type { PaymentDetails } from '../../types/payment';

// Mock payment history data with member information
const mockPayments: PaymentDetails[] = [
  {
    id: '1',
    amount: 49.99,
    currency: 'USD',
    method: 'credit_card',
    status: 'completed',
    createdAt: '2024-03-12T10:00:00',
    description: 'Monthly Membership Fee - March 2024',
    metadata: {
      member: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        membershipType: 'premium'
      }
    }
  },
  {
    id: '2',
    amount: 25.00,
    currency: 'USD',
    method: 'upi',
    status: 'completed',
    createdAt: '2024-03-05T15:30:00',
    description: 'Personal Training Session',
    metadata: {
      member: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        membershipType: 'basic'
      }
    }
  },
  {
    id: '3',
    amount: 35.00,
    currency: 'USD',
    method: 'cash',
    status: 'completed',
    createdAt: '2024-03-01T09:15:00',
    description: 'Group Class Package',
    metadata: {
      member: {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        membershipType: 'basic'
      },
      recordedBy: {
        id: '1',
        name: 'Admin User'
      }
    }
  }
];

export function Payments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payments, setPayments] = useState<PaymentDetails[]>(mockPayments);

  const handlePaymentSuccess = (transactionId: string, memberData?: any) => {
    // In a real application, you would fetch the updated payment details from your backend
    const newPayment: PaymentDetails = {
      id: transactionId,
      amount: 49.99,
      currency: 'USD',
      method: 'credit_card',
      status: 'completed',
      createdAt: new Date().toISOString(),
      description: 'Monthly Membership Fee',
      metadata: memberData ? {
        member: memberData
      } : undefined
    };

    setPayments([newPayment, ...payments]);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    // Handle payment error (show notification, etc.)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <Button onClick={() => setShowPaymentModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Make Payment
        </Button>
      </div>

      <PaymentHistory payments={payments} />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={49.99}
        description="Monthly Membership Fee"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
}