import { PageHeader } from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { students } from '@/lib/data';

export default function StudentsPage() {
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
            placeholder="Search students..."
            className="pl-8 sm:w-[300px]"
          />
        </div>
      </div>
      <DataTable columns={columns} data={students} />
    </>
  );
}
