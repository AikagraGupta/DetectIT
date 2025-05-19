# backend/app.py
import os
import cv2
import numpy as np
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # allow your Next.js frontend to call

# ─── 1. Ensure the full model is downloaded ────────────────────────────────────
MODEL_URL = (
    "https://github.com/AikagraGupta/DetectIT/"
    "releases/download/v1.0.0/Meso4_DF_full.keras"
)
MODEL_PATH = os.path.join("weights", "Meso4_DF_full.keras")
if not os.path.exists(MODEL_PATH):
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    resp = requests.get(MODEL_URL, stream=True); resp.raise_for_status()
    with open(MODEL_PATH, "wb") as f:
        for chunk in resp.iter_content(8192):
            f.write(chunk)

# ─── 2. Load your Keras model ─────────────────────────────────────────────────
model = load_model(MODEL_PATH, compile=False)

# ─── 3. Helpers ───────────────────────────────────────────────────────────────
def preprocess_image(file_stream):
    """Read an image file and return a (1,256,256,3) numpy array."""
    file_bytes = np.frombuffer(file_stream.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (256,256)).astype("float32") / 255.0
    return np.expand_dims(img, 0)

def sample_video_frames(file_stream, samples=30):
    """Read a video file, sample frames, and return list of preprocessed arrays."""
    # save to a temp file so OpenCV can open it
    tmp_path = "temp_video.mkv"
    with open(tmp_path, "wb") as f:
        f.write(file_stream.read())

    cap = cv2.VideoCapture(tmp_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    interval = max(1, total // samples)
    frames = []
    idx = taken = 0

    while True:
        ret, frame = cap.read()
        if not ret: break
        if idx % interval == 0 and taken < samples:
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            resized = cv2.resize(rgb, (256,256)).astype("float32") / 255.0
            frames.append(np.expand_dims(resized, 0))
            taken += 1
        idx += 1

    cap.release()
    os.remove(tmp_path)
    return frames

# ─── 4. Endpoints ────────────────────────────────────────────────────────────
@app.route("/predict-image", methods=["POST"])
def predict_image():
    if "file" not in request.files:
        return jsonify(error="no file"), 400
    img_array = preprocess_image(request.files["file"])
    score = float(model.predict(img_array, verbose=0)[0][0])
    return jsonify(label="real" if score>=0.5 else "deepfake", confidence=score)

@app.route("/predict-video", methods=["POST"])
def predict_video():
    if "file" not in request.files:
        return jsonify(error="no file"), 400
    frames = sample_video_frames(request.files["file"], samples=30)
    scores = [float(model.predict(f, verbose=0)[0][0]) for f in frames]
    avg = float(np.mean(scores)) if scores else 0.0
    return jsonify(label="real" if avg>=0.5 else "deepfake", confidence=avg)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
