import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause, RotateCcw, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecorderProps {
  onVoiceNote: (audioBlob: Blob | null) => void;
  disabled?: boolean;
  hasVoiceNote?: boolean;
}

const AudioWaveform = ({ analyser }: { analyser: AnalyserNode | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 3;
      const gap = 2;
      const bars = Math.floor(canvas.width / (barWidth + gap));
      const step = Math.floor(bufferLength / bars);

      for (let i = 0; i < bars; i++) {
        const value = dataArray[i * step];
        const barHeight = (value / 255) * canvas.height * 0.8 + 4;
        
        const x = i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = `hsl(0, 72%, ${50 + (value / 255) * 20}%)`;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 1.5);
        ctx.fill();
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser]);

  return (
    <canvas 
      ref={canvasRef} 
      width={120} 
      height={32} 
      className="rounded"
    />
  );
};

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VoiceRecorder = ({ onVoiceNote, disabled, hasVoiceNote }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  // Clean up audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = useCallback(async () => {
    // Clear any previous recording
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordedBlob(null);
    setCurrentTime(0);
    setDuration(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      // Set up audio analyser for waveform
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      audioContextRef.current = audioContext;
      setAnalyser(analyserNode);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        stream.getTracks().forEach(track => track.stop());
        
        // Clean up audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        setAnalyser(null);
        
        // Create preview URL
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setRecordedBlob(audioBlob);
        
        // Get duration
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: 'Microphone Access Required',
        description: 'Please enable microphone access to record voice notes.',
        variant: 'destructive',
      });
    }
  }, [toast, audioUrl]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const togglePlayback = useCallback(() => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl, isPlaying]);

  const discardRecording = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordedBlob(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    onVoiceNote(null);
  }, [audioUrl, onVoiceNote]);

  const confirmRecording = useCallback(() => {
    if (!recordedBlob) return;
    
    // Stop playback if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);

    onVoiceNote(recordedBlob);
    toast({
      title: 'Voice note added',
      description: 'Your voice note will be sent with your enquiry.',
    });
  }, [recordedBlob, onVoiceNote, toast]);

  // Show confirmed voice note state
  if (hasVoiceNote && !audioUrl) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-md border border-green-500/20 text-green-700 dark:text-green-400">
          <Check className="h-4 w-4" />
          <span className="text-sm">Voice note attached</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onVoiceNote(null)}
          disabled={disabled}
          className="gap-1.5 text-muted-foreground hover:text-destructive"
        >
          <X className="h-3.5 w-3.5" />
          Remove
        </Button>
      </div>
    );
  }

  // Preview state - show after recording, before confirming
  if (audioUrl) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={togglePlayback}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm font-mono min-w-[70px]">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={discardRecording}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Re-record
        </Button>
        
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={confirmRecording}
          disabled={disabled}
          className="gap-1.5"
        >
          <Check className="h-3.5 w-3.5" />
          Use This Recording
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isRecording && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-md border border-destructive/20">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          <AudioWaveform analyser={analyser} />
        </div>
      )}
      
      {isRecording ? (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={stopRecording}
          disabled={disabled}
          className="gap-2"
        >
          <Square className="h-4 w-4" />
          Stop
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={startRecording}
          disabled={disabled}
          className="gap-2"
        >
          <Mic className="h-4 w-4" />
          Record Voice Note
        </Button>
      )}
    </div>
  );
};
