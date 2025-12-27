import { LectureCreate } from "./schemas";
import type { Lecture, Student } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function fetchAPI(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  try {
    const response = await fetch(url, { ...options, cache: 'no-store' });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error on ${path}:`, response.status, errorBody);
      throw new Error(`Failed to fetch from ${path}. Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Network or fetch error for ${path}:`, error);
    throw error;
  }
}

// Lectures
export const getLectures = (): Promise<Lecture[]> => fetchAPI('/lectures/all');
export const createLecture = (lecture: LectureCreate) => fetchAPI('/lectures', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(lecture)
});

// Students
export const getStudents = (): Promise<Student[]> => fetchAPI('/students/all');
export const getStudentSummary = (studentId: number | string) => fetchAPI(`/attendance/student/${studentId}/summary`);

// Attendance
export const startAttendance = (cameraId: string) => fetchAPI(`/attendance/start/${cameraId}`, { method: 'POST' });
export const stopAttendance = (cameraId: string) => fetchAPI(`/attendance/stop/${cameraId}`, { method: 'POST' });
export const getAttendanceForLecture = (lectureId: number | string) => fetchAPI(`/attendance/lecture/${lectureId}`);
export const getAttendanceStats = (lectureId: number | string) => fetchAPI(`/attendance/stats/${lectureId}`);

// Defaulters
export const getOverallDefaulters = (threshold: number) => fetchAPI(`/attendance/defaulters?threshold=${threshold}`);
export const getSubjectDefaulters = (subject: string, threshold: number) => fetchAPI(`/attendance/defaulters/subject/${subject}?threshold=${threshold}`);
export const getDateRangeDefaulters = (start: string, end: string, threshold: number) => fetchAPI(`/attendance/defaulters/range?start=${start}&end=${end}&threshold=${threshold}`);

// Cameras & System Status
export const getCameras = (): Promise<{ cameras: string[] }> => fetchAPI('/cameras');
export const getCameraStatus = (cameraId: string) => fetchAPI(`/status/${cameraId}`);
export const getDashboardKPIs = () => fetchAPI('/dashboard/kpis');