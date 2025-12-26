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
import { lectures } from '@/lib/data';

export default function LecturesPage() {
  return (
    <>
      <PageHeader title="Lectures" description="Manage scheduled lectures.">
        <Dialog>
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
            <LectureForm />
          </DialogContent>
        </Dialog>
      </PageHeader>
      <DataTable columns={columns} data={lectures} />
    </>
  );
}
