"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { createClient } from "../../utils/supabase/client";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export default function UploadImagePage() {
  // don't call createClient() here – that runs on server too!
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
  const [file,    setFile   ] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result,  setResult ] = useState<{ label: string; confidence: number } | null>(null);
  const [error,   setError  ] = useState<string | null>(null);

  // this only runs in the browser, after hydration
  useEffect(() => {
    setSupabase(createClient());
  }, []);

  const handleDetectAndUpload = async () => {
    if (!file) return;
    if (!supabase) {
      setError("Client not initialized yet, please try again.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File too large—pick under 50 MB.");
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      // 1) Deepfake detection
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("https://your-render-api.onrender.com/predict-image", {
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
        .from("images")
        .upload(fileName, file, { contentType: file.type });
      if (uploadError) throw uploadError;
    } catch (err: unknown) {
      console.error(err);
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
      <section className="…">
        {/* … your existing JSX … */}
      </section>
    </>
  );
}
