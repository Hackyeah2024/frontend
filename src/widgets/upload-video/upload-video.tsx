"use client";

import { useState } from "react";
import axios from "axios";

export const UploadVideo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("Uploading...");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Upload successful!");
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {file && (
        <div>
          <button onClick={handleUpload}>Upload Video</button>
          <p>Upload progress: {uploadProgress}%</p>
          <p>Status: {uploadStatus}</p>
        </div>
      )}
    </div>
  );
};
