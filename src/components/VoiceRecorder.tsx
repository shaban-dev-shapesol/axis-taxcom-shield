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

  const progress = note.duration > 0 ? (currentTime / note.duration) * 100 : 0;

  return (
    <div className="group flex items-center gap-3 p-3 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="h-10 w-10 rounded-full shrink-0"
        onClick={togglePlayback}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </Button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-foreground">Voice Note {index + 1}</span>
          <span className="text-xs text-muted-foreground font-mono">
            {formatDuration(currentTime)} / {formatDuration(note.duration)}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <X className="h-4 w-4" />
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

        if (!audioBlob || audioBlob.size === 0) {
          console.warn('[VoiceRecorder] recorded empty audio blob');
          toast({
            title: 'Recording failed',
            description: 'No audio was captured. Please try again and ensure your microphone is working.',
            variant: 'destructive',
          });
          return;
        }
        // Clean up audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        setAnalyser(null);
        
        // Create preview URL and add to notes
        const url = URL.createObjectURL(audioBlob);
        const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        
        console.log('[VoiceRecorder] recorded blob', { size: audioBlob.size, type: audioBlob.type, id });
        const audio = new Audio();
        audio.preload = 'metadata';
        
        const handleDuration = () => {
          let duration = audio.duration;
          // Handle Infinity or NaN duration (common with webm)
          if (!isFinite(duration) || isNaN(duration)) {
            duration = 0;
          }
          
          const newNote: VoiceNote = {
            id,
            blob: audioBlob,
            url,
            duration,
          };
          
          setNotes(prev => {
            const updated = [...prev, newNote];
            // Notify parent with all blobs
            onVoiceNotes(updated.map(n => n.blob));
            return updated;
          });
          
          // Clean up event listeners
          audio.removeEventListener('loadedmetadata', handleDuration);
          audio.removeEventListener('durationchange', handleDurationChange);
          audio.removeEventListener('error', handleError);
        };
        
        const handleDurationChange = () => {
          // Some browsers fire durationchange when duration becomes available
          if (isFinite(audio.duration) && audio.duration > 0) {
            handleDuration();
          }
        };
        
        const handleError = () => {
          // If there's an error, still add the note with 0 duration
          console.warn('Could not load audio metadata, using 0 duration');
          const newNote: VoiceNote = {
            id,
            blob: audioBlob,
            url,
            duration: 0,
          };
          
          setNotes(prev => {
            const updated = [...prev, newNote];
            onVoiceNotes(updated.map(n => n.blob));
            return updated;
          });
        };
        
        audio.addEventListener('loadedmetadata', handleDuration);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('error', handleError);
        
        // Set src after adding listeners
        audio.src = url;
        
        // Fallback: if nothing fires in 2 seconds, add the note anyway
        setTimeout(() => {
          // Check if note was already added
          setNotes(prev => {
            const exists = prev.some(n => n.id === id);
            if (!exists) {
              console.warn('Duration detection timed out, adding note with 0 duration');
              const newNote: VoiceNote = {
                id,
                blob: audioBlob,
                url,
                duration: 0,
              };
              const updated = [...prev, newNote];
              onVoiceNotes(updated.map(n => n.blob));
              return updated;
            }
            return prev;
          });
        }, 2000);
      };

      mediaRecorderRef.current = mediaRecorder;
      // Timeslice improves reliability across browsers (ensures dataavailable fires)
      mediaRecorder.start(250);
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
    <div className="space-y-4">
      {/* Recording controls */}
      <div className="flex items-center gap-4">
        {isRecording ? (
          <>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-destructive/5 border border-destructive/20 rounded-xl flex-1">
              <span className="h-3 w-3 rounded-full bg-destructive animate-pulse shrink-0" />
              <span className="text-sm font-medium text-destructive">Recording...</span>
              <AudioWaveform analyser={analyser} />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={stopRecording}
              disabled={disabled}
              className="gap-2 rounded-xl px-6"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={startRecording}
            disabled={disabled}
            className="gap-2.5 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <Mic className="h-5 w-5" />
            {notes.length > 0 ? 'Add Another Voice Note' : 'Record Voice Note'}
          </Button>
        )}
      </div>

      {/* List of recorded voice notes */}
      {notes.length > 0 && (
        <div className="space-y-2">
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
    </div>
  );
};