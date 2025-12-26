import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { lectures, students } from '@/lib/data';

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and download detailed attendance reports."
      />
      <Tabs defaultValue="lecture">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lecture">Lecture Report</TabsTrigger>
          <TabsTrigger value="student">Student Report</TabsTrigger>
          <TabsTrigger value="date_range">Date Range Report</TabsTrigger>
        </TabsList>

        <TabsContent value="lecture">
          <Card>
            <CardHeader>
              <CardTitle>Lecture Report</CardTitle>
              <CardDescription>
                Select a lecture to generate its attendance report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Lecture</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lecture" />
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
              <Button><Download/> Export CSV</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Report</CardTitle>
              <CardDescription>
                Select a student to generate their full attendance summary.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Student</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button><Download/> Export CSV</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="date_range">
          <Card>
            <CardHeader>
              <CardTitle>Date Range Report</CardTitle>
              <CardDescription>
                Generate a combined attendance summary for a specific period.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <Button><Download/> Export CSV</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
