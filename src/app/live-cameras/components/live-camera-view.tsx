'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Play,
  RefreshCw,
  Square,
  LoaderCircle,
  AlertTriangle,
  Video,
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
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getCameras, getCameraStatus, startAttendance, stopAttendance } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LiveCameraView() {
  const [cameras, setCameras] = useState<string[]>([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [cameraStatus, setCameraStatus] = useState<any>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [isTogglingAttendance, setIsTogglingAttendance] = useState(false);
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchCameras() {
      try {
        const data = await getCameras();
        setCameras(data.cameras);
        if (data.cameras.length > 0) {
          setSelectedCamera(data.cameras[0]);
        }
      } catch (error) {
        console.error("Failed to fetch cameras:", error);
      }
    }
    fetchCameras();
  }, []);

  useEffect(() => {
    if (!selectedCamera) return;

    const fetchStatus = async () => {
      setIsLoadingStatus(true);
      try {
        const status = await getCameraStatus(selectedCamera);
        setCameraStatus(status);
      } catch (error) {
        console.error(`Failed to fetch status for camera ${selectedCamera}:`, error);
        setCameraStatus(null);
      } finally {
        setIsLoadingStatus(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Refresh status every 5 seconds

    return () => clearInterval(interval);
  }, [selectedCamera]);


  const handleToggleAttendance = async () => {
    if (!selectedCamera || !cameraStatus) return;

    const isStarting = !cameraStatus.manual_attendance;
    setIsTogglingAttendance(true);

    try {
      const action = isStarting ? startAttendance : stopAttendance;
      const result = await action(selectedCamera);
      
      // Optimistically update UI
      setCameraStatus((prev:any) => ({ ...prev, manual_attendance: isStarting }));

      toast({
        title: `Attendance ${isStarting ? 'Started' : 'Stopped'}`,
        description: result.message,
      });
      // Fetch status again for consistency
      const status = await getCameraStatus(selectedCamera);
      setCameraStatus(status);
    } catch(error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || `Could not ${isStarting ? 'start' : 'stop'} attendance.`,
      });
    } finally {
      setIsTogglingAttendance(false);
    }
  };
  
  const isAttendanceRunning = cameraStatus?.manual_attendance || cameraStatus?.auto_attendance_active;

  return (
    <Tabs value={selectedCamera} onValueChange={setSelectedCamera}>
      <TabsList>
        {cameras.map((cam) => (
          <TabsTrigger key={cam} value={cam}>
            {cam}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {selectedCamera ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <img
                src={`${API_URL}/video/${selectedCamera}`}
                alt={`Live feed from ${selectedCamera}`}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
             <div className="aspect-video w-full flex flex-col items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <Video className="w-16 h-16" />
                <p className="mt-4 text-lg font-semibold">No Camera Selected</p>
                <p>Select a camera to view its live feed.</p>
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
              {isLoadingStatus ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : cameraStatus ? (
                <div className="space-y-2 text-sm">
                  <p><strong>Lecture:</strong> {cameraStatus.current_lecture}</p>
                  <p><strong>Status:</strong> 
                    <Badge variant={isAttendanceRunning ? 'default' : 'outline'} className="ml-2">
                      {cameraStatus.manual_attendance ? 'Manual On' : cameraStatus.auto_attendance_active ? 'Auto On' : 'Inactive'}
                    </Badge>
                  </p>
                  <p><strong>Window:</strong> {cameraStatus.attendance_window_start || 'N/A'} - {cameraStatus.attendance_window_end || 'N/A'}</p>
                  <p><strong>Marked:</strong> {cameraStatus.marked_students_count || 0} students</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Could not load camera status.</p>
              )}
              <div className="flex items-center gap-2">
                <Button onClick={handleToggleAttendance} disabled={isTogglingAttendance || isLoadingStatus}>
                  {isTogglingAttendance ? <LoaderCircle className="animate-spin" /> : (isAttendanceRunning ? <Square /> : <Play />)}
                  <span>{isTogglingAttendance ? 'Please wait...' : (isAttendanceRunning ? 'Stop Manual' : 'Start Manual')}</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={isTogglingAttendance}>
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
