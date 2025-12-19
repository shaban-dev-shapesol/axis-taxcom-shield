import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceNote {
  id: string;
  blob: Blob;
  url: string;
  duration: number;
}

interface VoiceRecorderProps {
  onVoiceNotes: (voiceNotes: Blob[]) => void;
  disabled?: boolean;
  voiceNotes: Blob[];
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

const VoiceNoteItem = ({ 
  note, 
  index,
  onDelete,
  disabled 
}: { 
  note: VoiceNote; 
  index: number;
  onDelete: () => void;
  disabled?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(note.url);
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
  }, [note.url, isPlaying]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border">
        <span className="text-xs text-muted-foreground font-medium">#{index + 1}</span>
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
          {formatDuration(currentTime)} / {formatDuration(note.duration)}
        </span>
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onDelete}
        disabled={disabled}
        className="gap-1.5 text-muted-foreground hover:text-destructive"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export const VoiceRecorder = ({ onVoiceNotes, disabled, voiceNotes }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  // Sync internal notes with external voiceNotes prop
  useEffect(() => {
    if (voiceNotes.length === 0 && notes.length > 0) {
      // Clean up URLs when form is reset
      notes.forEach(note => URL.revokeObjectURL(note.url));
      setNotes([]);
    }
  }, [voiceNotes, notes]);

  // Clean up all audio URLs on unmount
  useEffect(() => {
    return () => {
      notes.forEach(note => URL.revokeObjectURL(note.url));
    };
  }, []);

  const startRecording = useCallback(async () => {
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
        
        // Create preview URL and add to notes
        const url = URL.createObjectURL(audioBlob);
        const id = crypto.randomUUID();
        
        // Get duration
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          const newNote: VoiceNote = {
            id,
            blob: audioBlob,
            url,
            duration: audio.duration,
          };
          
          setNotes(prev => {
            const updated = [...prev, newNote];
            // Notify parent with all blobs
            onVoiceNotes(updated.map(n => n.blob));
            return updated;
          });
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
  }, [toast, onVoiceNotes]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => {
      const noteToDelete = prev.find(n => n.id === id);
      if (noteToDelete) {
        URL.revokeObjectURL(noteToDelete.url);
      }
      const updated = prev.filter(n => n.id !== id);
      // Notify parent with remaining blobs
      onVoiceNotes(updated.map(n => n.blob));
      return updated;
    });
  }, [onVoiceNotes]);

  return (
    <div className="space-y-3">
      {/* List of recorded voice notes */}
      {notes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {notes.map((note, index) => (
            <VoiceNoteItem
              key={note.id}
              note={note}
              index={index}
              onDelete={() => deleteNote(note.id)}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {/* Recording controls */}
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
            {notes.length > 0 ? 'Add Another Voice Note' : 'Record Voice Note'}
          </Button>
        )}
      </div>
    </div>
  );
};