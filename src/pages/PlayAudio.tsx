import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, Pause, Download, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlayAudio = () => {
  const [searchParams] = useSearchParams();
  const audioUrl = searchParams.get("url");
  const noteNumber = searchParams.get("note") || "1";
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        setError("Failed to play audio. Please try downloading instead.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!audioUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md">
          <h1 className="text-white text-xl font-semibold mb-2">Audio Not Found</h1>
          <p className="text-slate-300">No audio URL was provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-white text-2xl font-semibold mb-2">Voice Note {noteNumber}</h1>
          <p className="text-slate-300 text-sm">Investigation.tax Client Recording</p>
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={() => setError("Failed to load audio. The file may be unavailable.")}
          preload="metadata"
        />

        {error ? (
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <a href={audioUrl} download>
                <Download className="w-4 h-4 mr-2" />
                Download Audio File
              </a>
            </Button>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-slate-400 text-sm mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handlePlayPause}
                size="lg"
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
            </div>

            {/* Download link */}
            <div className="mt-8 text-center">
              <a
                href={audioUrl}
                download
                className="inline-flex items-center text-slate-300 hover:text-white text-sm transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download audio file
              </a>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Investigation.tax - Confidential Client Communication
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayAudio;