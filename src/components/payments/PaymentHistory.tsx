import { format } from 'date-fns';
import { CreditCard, Smartphone, DollarSign, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import type { PaymentDetails } from '../../types/payment';

interface PaymentHistoryProps {
  payments: PaymentDetails[];
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
      case 'debit_card':
        return CreditCard;
      case 'upi':
        return Smartphone;
      case 'cash':
        return DollarSign;
      default:
        return CreditCard;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'platinum':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {payments.map((payment) => {
              const Icon = getPaymentIcon(payment.method);
              const member = payment.metadata?.member;
              
              return (
                <li key={payment.id} className="py-5">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {payment.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            ${payment.amount}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{format(new Date(payment.createdAt), 'MMM d, yyyy h:mm a')}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{payment.method.replace('_', ' ')}</span>
                        </div>
                      </div>

                      {member && (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span>{member.name}</span>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getMembershipTypeColor(
                              member.membershipType
                            )}`}
                          >
                            {member.membershipType}
                          </span>
                        </div>
                      )}

                      {isAdmin && payment.metadata?.recordedBy && (
                        <p className="mt-1 text-xs text-gray-500">
                          Recorded by: {payment.metadata.recordedBy.name}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}