"use client";

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { createClient } from '../../utils/supabase/client';

export default function UploadVideoPage() {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetectAndUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      // Send video for prediction
      const predictForm = new FormData();
      predictForm.append('file', file);
      const predictRes = await fetch('/api/predict-video', {
        method: 'POST',
        body: predictForm,
      });
      if (!predictRes.ok) throw new Error(`Prediction error: ${predictRes.statusText}`);
      const predictData = await predictRes.json();
      setResult({ label: predictData.label, confidence: predictData.confidence });

      // Upload video to Supabase
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, { contentType: file.type });
      if (uploadError) throw new Error('Upload failed: ' + uploadError.message);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <>
      <NavBar />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-6">Upload Your Video for Detection</h2>
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800 max-w-md w-full">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:rounded-lg file:px-4 file:py-2 file:font-medium file:text-white"
            disabled={uploading}
          />
          <button
            disabled={!file || uploading}
            onClick={handleDetectAndUpload}
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50"
          >
            {uploading ? 'Processing...' : 'Detect & Upload Video'}
          </button>

          {result && (
            <div className="mt-4 text-left text-gray-200">
              <p>Prediction: <span className="font-bold capitalize">{result.label}</span></p>
              <p>Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(2)}%</span></p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500">Error: {error}</div>
          )}
        </div>
      </section>
    </>
  );
}