"use client";

import { useRef, useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import { Upload, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui";
import { useToast } from "@/shared/lib/hooks";
import Link from "next/link";
import { cn } from "@/shared/lib";

export const UploadVideo = ({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  const [processingStep, setProcessingStep] = useState<number>(-1);

  const processingSteps = [
    "Generating transcripts",
    "Segmenting video",
    "Matching subtitles",
    "Processing facial recognition",
    "Summarizing speech",
    "Analyzing mistakes",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateProcessingStep = () => {
      setProcessingStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep < processingSteps.length - 1) {
          const stepDuration =
            Math.floor(Math.random() * (30000 - 10000 + 1)) + 20000;
          timeout = setTimeout(updateProcessingStep, stepDuration);
        }
        return nextStep;
      });
    };

    if (isLoading && uploadProgress === 100 && processingStep === -1) {
      updateProcessingStep();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, uploadProgress, processingStep]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;

    setIsLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("video_file", file);
    }

    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.post(
        // "https://hbe.k8s.techyon.dev/process_video",
        "http://localhost:5000/process_video",
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
          cancelToken: cancelTokenRef.current.token,
        }
      );

      setProcessingStep(0); // Move setProcessingStep(0) here, after the upload is complete

      if (response.status === 200) {
        toast({
          title: "Processed videos successfully",
          action: (
            <Link className={buttonVariants()} href="/videos">
              View your videos
            </Link>
          ),
        });
      } else {
        toast({
          title: "Upload failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        toast({
          title: "Upload cancelled.",
          variant: "default",
        });
      } else {
        console.error("Error uploading video:", error);
        toast({
          title: "Upload failed. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setProcessingStep(-1);
      onUploadSuccess();
    }
  };

  const handleCancel = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Upload cancelled by user");
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <label
          htmlFor="file-upload"
          className={cn(
            "cursor-pointer",
            isLoading && "pointer-events-none opacity-50"
          )}
        >
          <div
            className={cn(
              "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
            )}
          >
            <Upload className="w-12 h-12 text-gray-400" />
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple={true}
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
          <p className="mt-2">{uploadProgress}% uploaded</p>
        </div>
      )}

      {isLoading && (
        <div className="mb-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-2">
            {uploadProgress < 100
              ? `Uploading: ${uploadProgress}%`
              : processingStep >= 0 && processingStep < processingSteps.length
              ? processingSteps[processingStep]
              : "Processing video..."}
          </p>
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <Button onClick={() => inputRef.current?.click()} disabled={isLoading}>
          Select videos to process
        </Button>
        {isLoading && (
          <Button onClick={handleCancel} variant="destructive">
            Cancel
          </Button>
        )}
      </div>
    </>
  );
};
