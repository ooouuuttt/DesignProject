'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { lectures, attendance, students } from '@/lib/data';

const statCards = [
  { title: 'Total Students', key: 'total' },
  { title: 'Present', key: 'present' },
  { title: 'Absent', key: 'absent' },
  { title: 'Attendance %', key: 'percentage' },
];

export default function AttendancePage() {
  const [selectedLecture, setSelectedLecture] = useState(lectures[0].id);

  const lecture = lectures.find((l) => l.id === selectedLecture);
  const attendanceRecords = attendance[selectedLecture] || [];
  
  const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
  const studentsInClass = students.filter(s => s.standard === lecture?.standard && s.division === lecture.division).length;
  const absentCount = studentsInClass - presentCount;
  const attendancePercentage = studentsInClass > 0 ? Math.round((presentCount / studentsInClass) * 100) : 0;

  const stats = {
    total: studentsInClass,
    present: presentCount,
    absent: absentCount,
    percentage: `${attendancePercentage}%`,
  };
  
  const allStudentRecords = students
    .filter(s => s.standard === lecture?.standard && s.division === lecture.division)
    .map(student => {
      const record = attendanceRecords.find(r => r.studentId === student.id);
      return record || { studentId: student.id, studentName: student.name, status: 'Absent' };
    });

  return (
    <>
      <PageHeader
        title="Attendance View"
        description="Review attendance for specific lectures."
      >
        <div className="flex items-center gap-2">
           <Button variant="outline">
            <RefreshCw /> Refresh
          </Button>
          <Button>
            <Download /> Download CSV
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6 max-w-sm">
        <Select value={selectedLecture} onValueChange={setSelectedLecture}>
          <SelectTrigger>
            <SelectValue placeholder="Select a lecture" />
          </SelectTrigger>
          <SelectContent>
            {lectures.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.subject} - {l.date} ({l.startTime})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats[card.key as keyof typeof stats]}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Marked Time</TableHead>
                <TableHead>Camera ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allStudentRecords.map((record) => (
                <TableRow key={record.studentId}>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === 'Present' ? 'default' : 'destructive'}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.markedTime || 'N/A'}</TableCell>
                  <TableCell>{record.cameraId || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
