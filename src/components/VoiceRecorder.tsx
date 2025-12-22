import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause, X, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoiceNote {
  id: string;
  blob: Blob;
  url: string;
  duration: number;
  transcription?: string;
  isTranscribing?: boolean;
}

export interface VoiceNoteWithTranscription {
  blob: Blob;
  transcription?: string;
}

interface VoiceRecorderProps {
  onVoiceNotes: (voiceNotes: Blob[]) => void;
  onVoiceNotesWithTranscriptions?: (notes: VoiceNoteWithTranscription[]) => void;
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
  onTranscribe,
  disabled 
}: { 
  note: VoiceNote; 
  index: number;
  onDelete: () => void;
  onTranscribe: () => void;
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
    <div className="group flex flex-col gap-2 p-3 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
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
          onClick={onTranscribe}
          disabled={disabled || note.isTranscribing || !!note.transcription}
          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0"
          title={note.transcription ? "Already transcribed" : "Transcribe audio"}
        >
          {note.isTranscribing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
        </Button>
        
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

      {/* Transcription display */}
      {note.transcription && (
        <div className="mt-1 px-3 py-2 bg-muted/50 rounded-lg">
          <p className="text-sm text-foreground/80 italic">"{note.transcription}"</p>
        </div>
      )}
    </div>
  );
};

export const VoiceRecorder = ({ onVoiceNotes, onVoiceNotesWithTranscriptions, disabled, voiceNotes }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [notes, setNotes] = useState<VoiceNote[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobMetaRef = useRef<Map<Blob, VoiceNote>>(new Map());
  const { toast } = useToast();

  // Helpers
  const getOrCreateMetaForBlob = useCallback((blob: Blob): VoiceNote => {
    const existing = blobMetaRef.current.get(blob);
    if (existing) return existing;

    const url = URL.createObjectURL(blob);
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const meta: VoiceNote = { id, blob, url, duration: 0 };
    blobMetaRef.current.set(blob, meta);
    return meta;
  }, []);

  const resolveDurationForUrl = useCallback((url: string, timeoutMs = 2000): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      let done = false;

      const finish = (value: number) => {
        if (done) return;
        done = true;
        cleanup();
        resolve(value);
      };

      const cleanup = () => {
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.removeEventListener('durationchange', onDurationChange);
        audio.removeEventListener('error', onError);
      };

      const tryGet = () => {
        const d = audio.duration;
        if (isFinite(d) && d > 0) {
          finish(d);
          return true;
        }
        return false;
      };

      const onLoadedMetadata = () => {
        if (!tryGet()) {
          try {
            audio.currentTime = 1e101;
          } catch {
            // ignore
          }
        }
      };
      const onTimeUpdate = () => {
        if (tryGet()) {
          try {
            audio.currentTime = 0;
          } catch {
            // ignore
          }
        }
      };
      const onDurationChange = () => {
        tryGet();
      };
      const onError = () => finish(0);

      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('durationchange', onDurationChange);
      audio.addEventListener('error', onError);

      audio.preload = 'metadata';
      audio.src = url;

      window.setTimeout(() => finish(0), timeoutMs);
    });
  }, []);

  // Keep internal preview list in sync with parent-controlled blobs.
  useEffect(() => {
    // Revoke URLs for blobs that were removed upstream
    const current = new Set(voiceNotes);
    for (const [blob, meta] of blobMetaRef.current.entries()) {
      if (!current.has(blob)) {
        URL.revokeObjectURL(meta.url);
        blobMetaRef.current.delete(blob);
      }
    }

    const metas = voiceNotes.map(getOrCreateMetaForBlob);
    setNotes(metas);

    // Resolve durations for any notes that still have 0 duration
    metas.forEach((m) => {
      if (m.duration > 0) return;
      resolveDurationForUrl(m.url).then((d) => {
        if (!blobMetaRef.current.has(m.blob)) return; // removed
        const updatedMeta = { ...m, duration: d };
        blobMetaRef.current.set(m.blob, updatedMeta);
        setNotes((prev) => prev.map((n) => (n.blob === m.blob ? updatedMeta : n)));
      });
    });
  }, [voiceNotes, getOrCreateMetaForBlob, resolveDurationForUrl]);

  // Clean up all audio URLs on unmount
  useEffect(() => {
    return () => {
      for (const meta of blobMetaRef.current.values()) {
        URL.revokeObjectURL(meta.url);
      }
      blobMetaRef.current.clear();
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

        // Immediately create local meta so the item can render even if the parent rerenders/remounts.
        const meta = getOrCreateMetaForBlob(audioBlob);
        setNotes((prev) => {
          if (prev.some((n) => n.blob === audioBlob)) return prev;
          return [...prev, meta];
        });

        // Notify parent (source of truth)
        onVoiceNotes([...voiceNotes, audioBlob]);

        // Resolve duration asynchronously
        resolveDurationForUrl(meta.url).then((d) => {
          const updated = { ...meta, duration: d };
          blobMetaRef.current.set(audioBlob, updated);
          setNotes((prev) => prev.map((n) => (n.blob === audioBlob ? updated : n)));
        });
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
  }, [toast, onVoiceNotes, voiceNotes, getOrCreateMetaForBlob, resolveDurationForUrl]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || !isRecording) return;

    // Ensure we flush the last chunk before stopping (fixes "first recording not saved" on some browsers)
    try {
      if (recorder.state === 'recording') {
        recorder.requestData();
      }
    } catch (e) {
      console.warn('[VoiceRecorder] requestData failed (continuing):', e);
    }

    setIsRecording(false);

    // Give the browser a moment to deliver the final `dataavailable` event
    setTimeout(() => {
      try {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
      } catch (e) {
        console.warn('[VoiceRecorder] stop failed:', e);
      }
    }, 150);
  }, [isRecording]);

  const deleteNote = useCallback((id: string) => {
    const noteToDelete = notes.find((n) => n.id === id);
    if (!noteToDelete) return;

    // Local cleanup
    URL.revokeObjectURL(noteToDelete.url);
    blobMetaRef.current.delete(noteToDelete.blob);

    // Parent is source of truth
    onVoiceNotes(voiceNotes.filter((b) => b !== noteToDelete.blob));
  }, [notes, onVoiceNotes, voiceNotes]);

  const transcribeNote = useCallback(async (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note || note.isTranscribing || note.transcription) return;

    // Mark as transcribing
    setNotes((prev) => prev.map((n) => 
      n.id === id ? { ...n, isTranscribing: true } : n
    ));

    try {
      // Convert blob to base64
      const arrayBuffer = await note.blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Audio = btoa(binary);

      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { audio: base64Audio }
      });

      if (error) throw error;

      const transcription = data?.text || '';
      
      // Update the note with transcription
      const updatedMeta = { ...note, transcription, isTranscribing: false };
      blobMetaRef.current.set(note.blob, updatedMeta);
      setNotes((prev) => {
        const newNotes = prev.map((n) => n.id === id ? updatedMeta : n);
        // Notify parent of updated transcriptions
        if (onVoiceNotesWithTranscriptions) {
          onVoiceNotesWithTranscriptions(
            newNotes.map((n) => ({ blob: n.blob, transcription: n.transcription }))
          );
        }
        return newNotes;
      });

      toast({
        title: 'Transcription Complete',
        description: 'Your voice note has been transcribed.',
      });
    } catch (error) {
      console.error('Transcription error:', error);
      setNotes((prev) => prev.map((n) => 
        n.id === id ? { ...n, isTranscribing: false } : n
      ));
      toast({
        title: 'Transcription Failed',
        description: 'Unable to transcribe audio. Please try again.',
        variant: 'destructive',
      });
    }
  }, [notes, toast]);

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
              onTranscribe={() => transcribeNote(note.id)}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};