import { PageHeader } from '@/components/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cameras } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';

export default function SystemStatusPage() {
  return (
    <>
      <PageHeader
        title="System Status"
        description="Real-time status of all configured cameras."
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Camera ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Lecture</TableHead>
              <TableHead>Attendance Active</TableHead>
              <TableHead>Marked Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cameras.map((camera) => (
              <TableRow key={camera.id}>
                <TableCell className="font-medium">{camera.id}</TableCell>
                <TableCell>
                  <Badge
                    variant={camera.status === 'Active' ? 'default' : 'destructive'}
                    className="gap-1"
                  >
                     <Circle className={cn(
                        "h-2 w-2",
                        camera.status === 'Active' ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"
                     )} />
                    {camera.status}
                  </Badge>
                </TableCell>
                <TableCell>{camera.currentLecture}</TableCell>
                <TableCell>
                  <Badge variant={camera.attendanceActive ? 'secondary' : 'outline'}>
                    {camera.attendanceActive ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>{camera.markedCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
