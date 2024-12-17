export interface ClassSchedule {
  id: string;
  title: string;
  trainer: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  type: 'yoga' | 'cardio' | 'strength' | 'hiit';
}

export interface BookingStatus {
  isBooked: boolean;
  isFull: boolean;
}