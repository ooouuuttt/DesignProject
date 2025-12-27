'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { lectureFormSchema, type LectureCreate } from '@/lib/schemas';
import { createLecture } from '@/lib/api';

export function LectureForm({ onLectureCreated }: { onLectureCreated: () => void }) {
  const { toast } = useToast();
  const form = useForm<LectureCreate>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      subject: '',
      academicYear: '2024-25',
      standard: '',
      division: '',
      classRoom: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '',
      endTime: '',
    },
  });

  async function onSubmit(values: LectureCreate) {
    try {
      await createLecture(values);
      toast({
        title: 'Lecture Scheduled',
        description: `Lecture for ${values.subject} has been created successfully.`,
      });
      onLectureCreated();
      form.reset();
    } catch (error) {
      console.error("Failed to create lecture:", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create the lecture. Please check the details and try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Physics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="academicYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Academic Year</FormLabel>
              <FormControl>
                <Input placeholder="2024-25" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="classRoom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom</FormLabel>
              <FormControl>
                <Input placeholder="e.g. C101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="standard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division</FormLabel>
              <FormControl>
                <Input placeholder="e.g. A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 text-right">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
