"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui";
import { useToast } from "@/shared/lib/hooks";
import Link from "next/link";
import { Video, videoApi } from "@/shared/api";

export const UploadVideo = ({
  isMultiple,
  onUploadSuccess,
}: {
  isMultiple: boolean;
  onUploadSuccess: () => void;
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setUploadProgress(0);

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("videos", file);
    }

    try {
      const response = await axios.post<{ files: Video[]; message: string }>(
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
        toast({
          title: "Upload successful!",
          action: (
            <Link className={buttonVariants()} href="/videos">
              View your videos
            </Link>
          ),
        });
        videoApi.addVideosToLocalStorage(response.data.files);
      } else {
        toast({
          title: "Upload failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadProgress(0);
      onUploadSuccess();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple={isMultiple}
            onChange={handleUpload}
            accept="video/mp4"
            ref={inputRef}
          />
        </label>
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mb-4 text-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="mt-2">{uploadProgress}% completed</p>
        </div>
      )}

      <Button onClick={() => inputRef.current?.click()}>
        {isMultiple ? "Select Videos to Compare" : "Select Video to Process"}
      </Button>
    </>
  );
};
