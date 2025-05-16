"use client";

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
// always use the client factory
import { createClient } from '../../utils/supabase/client';

export default function UploadImagePage() {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { contentType: file.type });
    if (error) {
      alert('Upload failed: ' + error.message);
    } else {
      alert('Image uploaded successfully!');
      setFile(null);
    }
    setUploading(false);
  };

  return (
    <>
      <NavBar />

      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-6">Upload Your Image for Detection</h2>
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800 max-w-md w-full">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:rounded-lg file:px-4 file:py-2 file:font-medium file:text-white"
          />
          <button
            disabled={!file || uploading}
            onClick={handleUpload}
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </section>
    </>
  );
}