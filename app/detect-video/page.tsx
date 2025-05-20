"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { createClient } from "../../utils/supabase/client";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
const API_URL = process.env.NEXT_PUBLIC_DETECT_API_URL!;

export default function UploadVideoPage() {
  // only initialize Supabase in the browser
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // these *are* used below:
  const [processing, setProcessing] = useState(false);
  const [result, setResult]       = useState<{ label: string; confidence: number } | null>(null);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  // this is wired up to the button's onClick below:
  const handleDetectAndUpload = async () => {
    if (!file || !supabase) return;

    if (file.size > MAX_VIDEO_SIZE) {
      setError("Video is too large—please pick one under 50 MB.");
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      // 1) send to Flask
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_URL}/predict-video`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(`Detection failed: ${res.statusText}`);
      const { label, confidence } = await res.json();
      setResult({ label, confidence });

      // 2) upload to Supabase
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadErr } = await supabase
        .storage
        .from("videos")
        .upload(fileName, file, { contentType: file.type });
      if (uploadErr) throw uploadErr;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
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
          {/* file input uses processing state */}
          <input
            type="file"
            accept="video/*"
            disabled={processing}
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setError(null);
              setResult(null);
            }}
            className="block w-full text-gray-200 file:bg-gray-800 file:border file:border-gray-700 file:rounded-lg file:px-4 file:py-2 file:font-medium file:text-white"
          />

          {/* button wired to handleDetectAndUpload */}
          <button
            disabled={!file || processing}
            onClick={handleDetectAndUpload}
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50"
          >
            {processing ? "Processing..." : "Detect & Upload Video"}
          </button>

          {/* show result if set */}
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

          {/* show error if set */}
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
