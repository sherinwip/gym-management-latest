export type PaymentMethod = 'credit_card' | 'debit_card' | 'upi' | 'cash';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PaymentDetails {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface CardDetails {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  name: string;
}

export interface UPIDetails {
  id: string;
  provider: string;
}

export interface PaymentGatewayResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}