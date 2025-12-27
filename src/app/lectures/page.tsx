'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { LectureForm } from './components/lecture-form';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useEffect, useState } from 'react';
import { getLectures } from '@/lib/api';
import type { Lecture } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function fetchLectures() {
    setLoading(true);
    try {
      const data = await getLectures();
      setLectures(data);
    } catch (error) {
      console.error("Failed to fetch lectures", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleLectureCreated = () => {
    setDialogOpen(false);
    fetchLectures(); // Refresh the list
  }

  return (
    <>
      <PageHeader title="Lectures" description="Manage scheduled lectures.">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Create Lecture
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Lecture</DialogTitle>
              <DialogDescription>
                Fill in the details to schedule a new lecture.
              </DialogDescription>
            </DialogHeader>
            <LectureForm onLectureCreated={handleLectureCreated} />
          </DialogContent>
        </Dialog>
      </PageHeader>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <DataTable columns={columns} data={lectures} />
      )}
    </>
  );
}
