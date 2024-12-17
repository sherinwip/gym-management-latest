import { useState } from 'react';
import { Users, Dumbbell, Calendar as CalendarIcon, TrendingUp, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { UpcomingClasses } from '../../components/dashboard/UpcomingClasses';
import { ActivityChart } from '../../components/dashboard/ActivityChart';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { MembershipChart } from '../../components/dashboard/MembershipChart';
import { ClassAttendanceChart } from '../../components/dashboard/ClassAttendanceChart';
import type { ClassSchedule } from '../../types/schedule';

const mockClasses: ClassSchedule[] = [
  {
    id: '1',
    title: 'Morning Yoga',
    trainer: 'Sarah Smith',
    startTime: '2024-03-12T08:00:00',
    endTime: '2024-03-12T09:00:00',
    capacity: 20,
    enrolled: 15,
    type: 'yoga'
  },
  {
    id: '2',
    title: 'HIIT Workout',
    trainer: 'Mike Johnson',
    startTime: '2024-03-12T10:00:00',
    endTime: '2024-03-12T11:00:00',
    capacity: 15,
    enrolled: 12,
    type: 'hiit'
  }
];

const mockActivityData = [
  { day: 'Mon', visits: 10 },
  { day: 'Tue', visits: 15 },
  { day: 'Wed', visits: 12 },
  { day: 'Thu', visits: 18 },
  { day: 'Fri', visits: 20 },
  { day: 'Sat', visits: 16 },
  { day: 'Sun', visits: 8 }
];

const mockMembershipData = [
  { name: 'Basic', value: 45, color: '#8884d8' },
  { name: 'Premium', value: 35, color: '#82ca9d' },
  { name: 'Platinum', value: 20, color: '#ffc658' }
];

const mockAttendanceData = [
  { name: 'Week 1', yoga: 40, hiit: 24, strength: 28 },
  { name: 'Week 2', yoga: 35, hiit: 28, strength: 32 },
  { name: 'Week 3', yoga: 45, hiit: 30, strength: 35 },
  { name: 'Week 4', yoga: 42, hiit: 32, strength: 30 }
];

const mockActivities = [
  {
    id: '1',
    type: 'workout',
    description: 'Completed Full Body Strength workout',
    timestamp: '2024-03-11T15:30:00'
  },
  {
    id: '2',
    type: 'class',
    description: 'Booked Morning Yoga class',
    timestamp: '2024-03-11T10:00:00'
  },
  {
    id: '3',
    type: 'diet',
    description: 'Updated meal plan',
    timestamp: '2024-03-11T09:15:00'
  }
];

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [upcomingClasses] = useState<ClassSchedule[]>(mockClasses);

  const handleBookClass = (classItem: ClassSchedule) => {
    console.log('Booking class:', classItem);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name || 'Guest'}!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Here's what's happening with your fitness journey today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="2,543"
          description="Active gym members"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="$45,678"
          description="This month's earnings"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Trainers"
          value="12"
          description="Professional trainers"
          icon={Dumbbell}
        />
        <StatsCard
          title="Class Attendance"
          value="89%"
          description="Average attendance rate"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityChart data={mockActivityData} />
        <MembershipChart data={mockMembershipData} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ClassAttendanceChart data={mockAttendanceData} />
        <UpcomingClasses
          classes={upcomingClasses}
          onBookClass={handleBookClass}
        />
      </div>

      <div className="grid grid-cols-1">
        <RecentActivity activities={mockActivities} />
      </div>
    </div>
  );
}