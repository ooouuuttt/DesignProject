'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { StudentProfile } from './student-profile';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getStudentImage = (studentId: string) => 
  PlaceHolderImages.find(img => img.id === `student-${studentId.slice(-1)}`);

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const student = row.original;
      const studentImage = getStudentImage(student.id);
      return (
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar>
                <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint={studentImage?.imageHint} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium group-hover:underline">{student.name}</span>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Student Profile</SheetTitle>
              <SheetDescription>Detailed attendance summary for {student.name}.</SheetDescription>
            </SheetHeader>
            <StudentProfile student={student} />
          </SheetContent>
        </Sheet>
      );
    },
  },
  {
    accessorKey: 'standard',
    header: 'Standard',
  },
  {
    accessorKey: 'division',
    header: 'Division',
  },
  {
    accessorKey: 'overallAttendance',
    header: 'Overall Attendance',
    cell: ({ row }) => {
      const attendance = row.original.overallAttendance;
      const variant: 'default' | 'secondary' | 'destructive' =
        attendance > 85
          ? 'default'
          : attendance > 75
          ? 'secondary'
          : 'destructive';
      return <Badge variant={variant}>{attendance}%</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </SheetTrigger>
          <SheetContent>
             <SheetHeader>
              <SheetTitle>Student Profile</SheetTitle>
              <SheetDescription>Detailed attendance summary for {row.original.name}.</SheetDescription>
            </SheetHeader>
            <StudentProfile student={row.original} />
          </SheetContent>
        </Sheet>
      );
    },
  },
];
