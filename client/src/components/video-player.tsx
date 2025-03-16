import { useState, useRef } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="relative w-full max-w-md">
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-lg shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Your browser does not support the video tag.
        </video>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 rounded-full bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-white/80 hover:bg-white"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <video
            src={src}
            controls
            autoPlay
            className="w-full rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </DialogContent>
      </Dialog>
    </>
  );
}