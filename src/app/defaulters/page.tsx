'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getDefaulters, lectures } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DefaultersPage() {
  const [threshold, setThreshold] = useState(75);
  const [defaulters, setDefaulters] = useState<Student[]>(getDefaulters(75));

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0]);
    setDefaulters(getDefaulters(value[0]));
  };

  const uniqueSubjects = [...new Set(lectures.map(l => l.subject))];

  return (
    <>
      <PageHeader
        title="Defaulters"
        description="Identify students with attendance below the required threshold."
      />

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
            <Label htmlFor="threshold">Attendance Threshold: {threshold}%</Label>
            <Slider
              id="threshold"
              min={0}
              max={100}
              step={1}
              value={[threshold]}
              onValueChange={handleThresholdChange}
            />
        </div>
      </div>
      
       <Tabs defaultValue="overall">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="subject">Subject-wise</TabsTrigger>
          <TabsTrigger value="date_range">Date-range</TabsTrigger>
        </TabsList>
        <TabsContent value="overall">
            <DefaulterTable defaulters={defaulters} />
        </TabsContent>
        <TabsContent value="subject">
            <div className='max-w-sm mb-4'>
                 <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueSubjects.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <DefaulterTable defaulters={defaulters.slice(0, 2)} />
        </TabsContent>
        <TabsContent value="date_range">
           <div className="grid grid-cols-2 gap-4 mb-4 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="start-date-def">Start Date</Label>
                  <Input id="start-date-def" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date-def">End Date</Label>
                  <Input id="end-date-def" type="date" />
                </div>
              </div>
            <DefaulterTable defaulters={defaulters.slice(1, 3)} />
        </TabsContent>
      </Tabs>
    </>
  );
}

function DefaulterTable({ defaulters }: { defaulters: Student[] }) {
    return (
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Absent Lectures</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {defaulters.map((student) => (
                <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.standard} - {student.division}</TableCell>
                    <TableCell>
                    <Badge variant="destructive">{student.overallAttendance}%</Badge>
                    </TableCell>
                    <TableCell>{student.absentCount}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    );
}
