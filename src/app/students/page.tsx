'use client';

import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useEffect, useState } from 'react';
import { getStudents } from '@/lib/api';
import type { Student } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    const results = students.filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      String(student.id).toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(results);
  }, [search, students]);

  return (
    <>
      <PageHeader
        title="Students"
        description="Manage student records and view their attendance profiles."
      />
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students by name or ID..."
            className="pl-8 sm:w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
       {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <DataTable columns={columns} data={filteredStudents} />
      )}
    </>
  );
}
