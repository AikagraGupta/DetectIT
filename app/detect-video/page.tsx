"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { createClient } from "../../utils/supabase/client";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
const API_URL = process.env.NEXT_PUBLIC_DETECT_API_URL; // e.g. https://your-render-api.onrender.com

export default function UploadVideoPage() {
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // only in browser
  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const handleDetectAndUpload = async () => {
    if (!file) return;
    if (!supabase) {
      setError("Client not initialized yet – please wait a moment.");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setError("Video is too large – please select a file under 50 MB.");
      return;
    }
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      // 1) Deepfake detection
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_URL}/predict-video`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(`Detection failed: ${res.statusText}`);
      const { label, confidence } = await res.json();
      setResult({ label, confidence });

      // 2) Upload to Supabase
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase
        .storage
        .from("videos")
        .upload(fileName, file, { contentType: file.type });
      if (uploadError) throw uploadError;
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "An unknown error occurred";
      setError(message);
    } finally {
      setProcessing(false);
      setFile(null);
    }
  };

  return (
    <>
      <NavBar />

      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-center px-6 py-20">
        <h2 className="text-4xl font-bold text-white mb-6">
          Deepfake Video Detection
        </h2>
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800 max-w-md w-full">
          <input
            type="file"
            accept="video/*"
            disabled={processing}
            onChange={(e) => {
              setError(null);
              setResult(null);
              setFile(e.target.files?.[0] ?? null);
            }}
            className="block w-full text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:rounded-lg file:px-4 file:py-2 file:font-medium file:text-white"
          />

          <button
            disabled={!file || processing}
            onClick={handleDetectAndUpload}
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50"
          >
            {processing ? "Processing..." : "Detect & Upload Video"}
          </button>

          {result && (
            <div className="mt-4 text-left text-gray-200">
              <p>
                Prediction:{" "}
                <span className="font-bold capitalize">{result.label}</span>
              </p>
              <p>
                Confidence:{" "}
                <span className="font-bold">
                  {(result.confidence * 100).toFixed(2)}%
                </span>
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500">
              Error: {error}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
