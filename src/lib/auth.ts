import { User, UserRole } from '../types/auth';

// Mock user database
const users: Record<string, { password: string; user: User }> = {
  'member@fithub.com': {
    password: 'member123',
    user: {
      id: '1',
      email: 'member@fithub.com',
      name: 'John Doe',
      role: 'member' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    },
  },
  'trainer@fithub.com': {
    password: 'trainer123',
    user: {
      id: '2',
      email: 'trainer@fithub.com',
      name: 'Sarah Smith',
      role: 'trainer' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  },
  'admin@fithub.com': {
    password: 'admin123',
    user: {
      id: '3',
      email: 'admin@fithub.com',
      name: 'Mike Johnson',
      role: 'admin' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
  },
};

export async function loginUser(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userRecord = users[email];
  if (!userRecord || userRecord.password !== password) {
    throw new Error('Invalid email or password');
  }

  return userRecord.user;
}