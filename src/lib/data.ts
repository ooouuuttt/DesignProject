import type { Student, Lecture, AttendanceRecord, Camera } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const students: Student[] = [
  { id: 'S001', name: 'Aarav Sharma', standard: '12th', division: 'A', avatarUrl: getImage('student-1'), overallAttendance: 92, presentCount: 46, absentCount: 4 },
  { id: 'S002', name: 'Diya Patel', standard: '12th', division: 'A', avatarUrl: getImage('student-2'), overallAttendance: 74, presentCount: 37, absentCount: 13 },
  { id: 'S003', name: 'Rohan Singh', standard: '12th', division: 'B', avatarUrl: getImage('student-3'), overallAttendance: 85, presentCount: 42, absentCount: 8 },
  { id: 'S004', name: 'Priya Kumar', standard: '11th', division: 'A', avatarUrl: getImage('student-4'), overallAttendance: 68, presentCount: 34, absentCount: 16 },
  { id: 'S005', name: 'Advik Reddy', standard: '11th', division: 'B', avatarUrl: getImage('student-5'), overallAttendance: 95, presentCount: 47, absentCount: 3 },
];

export const lectures: Lecture[] = [
  { id: 'L01', subject: 'Physics', date: '2024-07-29', startTime: '09:00', endTime: '10:00', academicYear: '2024-25', standard: '12th', division: 'A', classRoom: 'C101' },
  { id: 'L02', subject: 'Chemistry', date: '2024-07-29', startTime: '10:00', endTime: '11:00', academicYear: '2024-25', standard: '12th', division: 'B', classRoom: 'C102' },
  { id: 'L03', subject: 'Mathematics', date: '2024-07-29', startTime: '11:00', endTime: '12:00', academicYear: '2024-25', standard: '11th', division: 'A', classRoom: 'C103' },
  { id: 'L04', subject: 'Biology', date: '2024-07-28', startTime: '09:00', endTime: '10:00', academicYear: '2024-25', standard: '12th', division: 'A', classRoom: 'C101' },
  { id: 'L05', subject: 'Computer Science', date: '2024-07-28', startTime: '10:00', endTime: '11:00', academicYear: '2024-25', standard: '11th', division: 'B', classRoom: 'C104' },
];

export const attendance: { [lectureId: string]: AttendanceRecord[] } = {
  'L01': [
    { studentId: 'S001', studentName: 'Aarav Sharma', status: 'Present', markedTime: '09:03:12', cameraId: 'C101' },
    { studentId: 'S002', studentName: 'Diya Patel', status: 'Present', markedTime: '09:04:51', cameraId: 'C101' },
  ],
  'L02': [
    { studentId: 'S003', studentName: 'Rohan Singh', status: 'Present', markedTime: '10:02:30', cameraId: 'C102' },
  ],
  'L03': [
    { studentId: 'S004', studentName: 'Priya Kumar', status: 'Absent' },
  ],
  'L04': [
    { studentId: 'S001', studentName: 'Aarav Sharma', status: 'Present', markedTime: '09:01:55', cameraId: 'C101' },
    { studentId: 'S002', studentName: 'Diya Patel', status: 'Absent' },
  ],
  'L05': [
    { studentId: 'S005', studentName: 'Advik Reddy', status: 'Present', markedTime: '10:05:01', cameraId: 'C104' },
  ],
};

export const cameras: Camera[] = [
  { id: 'C101', status: 'Active', currentLecture: 'Physics (L01)', attendanceActive: true, markedCount: 48 },
  { id: 'C102', status: 'Active', currentLecture: 'Chemistry (L02)', attendanceActive: true, markedCount: 45 },
  { id: 'C103', status: 'Active', currentLecture: 'Mathematics (L03)', attendanceActive: false, markedCount: 49 },
  { id: 'C104', status: 'Offline', currentLecture: 'N/A', attendanceActive: false, markedCount: 0 },
  { id: 'C105', status: 'Active', currentLecture: 'N/A', attendanceActive: false, markedCount: 0 },
];

export const getDefaulters = (threshold: number) => students.filter(s => s.overallAttendance < threshold);
