-- Create a public bucket for voice notes
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-notes', 'voice-notes', true);

-- Allow anyone to read voice notes (for email playback)
CREATE POLICY "Voice notes are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'voice-notes');

-- Allow anonymous uploads to voice notes bucket (for form submissions)
CREATE POLICY "Anyone can upload voice notes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'voice-notes');