'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Download, Eye } from 'lucide-react';
import type { Lecture } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Lecture>[] = [
  {
    accessorKey: 'subject',
    header: 'Subject',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => `${row.original.startTime} - ${row.original.endTime}`,
  },
  {
    accessorKey: 'standard',
    header: 'Standard',
    cell: ({ row }) => <Badge variant="outline">{row.original.standard}</Badge>
  },
  {
    accessorKey: 'division',
    header: 'Division',
  },
  {
    accessorKey: 'classRoom',
    header: 'Classroom',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const lecture = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lecture.id)}
            >
              <Eye /> View Attendance
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download /> Download CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
