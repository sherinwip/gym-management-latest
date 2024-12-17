import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Member } from '../../types/member';

const paymentSchema = z.object({
  memberId: z.string().min(1, 'Member is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface AdminPaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing: boolean;
}

// Mock member data - replace with actual member fetching
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-01-15',
    membershipType: 'premium',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2024-02-01',
    membershipType: 'basic',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  }
];

export function AdminPaymentForm({ onSubmit, isProcessing }: AdminPaymentFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showMemberList, setShowMemberList] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const filteredMembers = mockMembers.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setValue('memberId', member.id);
    setShowMemberList(false);
    setSearchQuery(member.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Member
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowMemberList(true);
            }}
            onFocus={() => setShowMemberList(true)}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Search member..."
          />
        </div>
        
        {showMemberList && filteredMembers.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                onClick={() => handleMemberSelect(member)}
              >
                <img
                  src={member.avatar}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {errors.memberId && (
          <p className="mt-1 text-sm text-red-600">{errors.memberId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Record Payment'}
      </Button>
    </form>
  );
}