'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { lectures } from '@/lib/data';
import type { Student } from '@/lib/types';

export function StudentProfile({ student }: { student: Student }) {
  const studentLectures = lectures.filter(
    (l) => l.standard === student.standard && l.division === student.division
  );

  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={student.avatarUrl} alt={student.name} />
          <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{student.name}</h2>
          <p className="text-sm text-muted-foreground">
            {student.standard} - {student.division}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold">{student.overallAttendance}%</span>
            <div className="text-right">
              <p>{student.presentCount} Present</p>
              <p>{student.absentCount} Absent</p>
            </div>
          </div>
          <Progress value={student.overallAttendance} className="w-full" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lecture-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentLectures.map(lecture => (
                <TableRow key={lecture.id}>
                  <TableCell>{lecture.subject}</TableCell>
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell>
                    <Badge variant={Math.random() > 0.2 ? 'default' : 'destructive'}>
                      {Math.random() > 0.2 ? 'Present' : 'Absent'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
