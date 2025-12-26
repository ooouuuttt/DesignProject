'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  RefreshCw,
  Square,
  LoaderCircle,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cameras, lectures } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Lecture } from '@/lib/types';
import { populateLectureInfo } from '@/ai/flows/lecture-info-auto-population';
import { liveCameraFaceRecognition } from '@/ai/flows/live-camera-face-recognition';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function LiveCameraView() {
  const [selectedCamera, setSelectedCamera] = useState(cameras[0].id);
  const [lectureInfo, setLectureInfo] = useState<Partial<Lecture> | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const { toast } = useToast();

  const camera = cameras.find((c) => c.id === selectedCamera);
  const videoFeed = PlaceHolderImages.find((img) => img.id === `cam-${selectedCamera.toLowerCase()}`);

  useEffect(() => {
    const fetchLectureInfo = async () => {
      if (!camera || camera.status === 'Offline') {
        setLectureInfo(null);
        setIsLoadingInfo(false);
        return;
      }
      setIsLoadingInfo(true);
      try {
        // In a real app, this would use the real camera ID to get lecture data.
        // Here we simulate it by finding a lecture with the same classroom.
        const mockLecture = lectures.find(l => l.classRoom === camera.id);
        if (mockLecture) {
            const result = await populateLectureInfo({ cameraId: camera.id });
            // We use the result from AI, but seed it with our mock data for consistency
             setLectureInfo({ ...mockLecture, subject: result.subject });
        } else {
            setLectureInfo({ subject: 'No active lecture' });
        }
      } catch (error) {
        console.error('Failed to populate lecture info:', error);
        setLectureInfo({ subject: 'Error loading info' });
      } finally {
        setIsLoadingInfo(false);
      }
    };

    fetchLectureInfo();
  }, [selectedCamera, camera]);

  const handleStartAttendance = async () => {
    if (!videoFeed) return;
    setIsMarking(true);
    try {
      const result = await liveCameraFaceRecognition({
        cameraId: selectedCamera,
        videoDataUri: videoFeed.imageUrl,
        lectureId: lectureInfo?.id || 'L-Unknown'
      });
      toast({
        title: "Attendance Process Complete",
        description: `${result.attendanceMarked} students marked. ${result.report}`,
      });
    } catch(error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not run face recognition.",
      });
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <Tabs value={selectedCamera} onValueChange={setSelectedCamera}>
      <TabsList>
        {cameras.map((cam) => (
          <TabsTrigger key={cam.id} value={cam.id}>
            {cam.id}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {camera?.status === 'Active' && videoFeed ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <Image
                src={videoFeed.imageUrl}
                alt={`Live feed from ${selectedCamera}`}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                data-ai-hint={videoFeed.imageHint}
                priority
              />
            </div>
          ) : (
             <div className="aspect-video w-full flex flex-col items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <AlertTriangle className="w-16 h-16" />
                <p className="mt-4 text-lg font-semibold">Camera Offline</p>
                <p>Unable to display video feed for {selectedCamera}.</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Information Panel</CardTitle>
              <CardDescription>
                Details for Camera: {selectedCamera}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingInfo ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : lectureInfo ? (
                <div className="space-y-2 text-sm">
                  <p><strong>Subject:</strong> {lectureInfo.subject}</p>
                  <p><strong>Standard & Div:</strong> {lectureInfo.standard} - {lectureInfo.division}</p>
                  <p><strong>Time:</strong> {lectureInfo.startTime} - {lectureInfo.endTime}</p>
                  <p><strong>Marked:</strong> {camera?.markedCount || 0} students</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active lecture or camera is offline.</p>
              )}
              <div className="flex items-center gap-2">
                <Button onClick={handleStartAttendance} disabled={isMarking || camera?.status === 'Offline'}>
                  {isMarking ? <LoaderCircle className="animate-spin" /> : <Play />}
                  <span>{isMarking ? 'Marking...' : 'Start Attendance'}</span>
                </Button>
                <Button variant="outline" disabled={isMarking}>
                  <Square />
                  <span>Stop</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={isMarking}>
                  <RefreshCw />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Tabs>
  );
}
