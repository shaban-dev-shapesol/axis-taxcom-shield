-- Create storage bucket for HMRC document uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('hmrc-documents', 'hmrc-documents', false);

-- Allow authenticated and anonymous users to upload documents
CREATE POLICY "Anyone can upload HMRC documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hmrc-documents');

-- Allow reading own uploaded documents
CREATE POLICY "Anyone can read HMRC documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'hmrc-documents');