"use client";

import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { createClient } from "../../utils/supabase/client";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

export default function UploadImagePage() {
  const supabase = createClient();
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetectAndUpload = async () => {
    if (!file) return;

    // 1) Size check
    if (file.size > MAX_SIZE) {
      setError("File is too large, please select an image under 50 MB.");
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      // 2) Run deepfake detection via Flask
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("http://localhost:5000/predict-image", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(`Detection failed: ${res.statusText}`);
      const data = await res.json();
      setResult({ label: data.label, confidence: data.confidence });

      // 3) Archive the image in Supabase
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { contentType: file.type });
      if (uploadError) throw uploadError;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
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
          Deepfake Image Detection
        </h2>

        <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl p-8 space-y-6 shadow-xl border border-gray-800 max-w-md w-full">
          <input
            type="file"
            accept="image/*"
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
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
          >
            {processing ? "Processing..." : "Detect & Upload"}
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
