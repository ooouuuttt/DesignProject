export type Student = {
  id: string | number;
  name: string;
  standard: string;
  division: string;
  avatarUrl: string;
  overallAttendance: number;
  presentCount: number;
  absentCount: number;
};

export type Lecture = {
  id: string | number;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  academicYear: string;
  standard: string;
  division: string;
  classRoom: string;
};

export type AttendanceRecord = {
  studentId: string;
  studentName: string;
  status: 'Present' | 'Absent';
  markedTime?: string;
  cameraId?: string;
};

export type Camera = {
  id: string;
  status: 'Active' | 'Offline' | 'loading';
  currentLecture?: string;
  attendanceActive: boolean;
  markedCount: number;
};
