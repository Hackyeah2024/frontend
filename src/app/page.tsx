"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { useState } from "react";
import { UploadVideo } from "@/widgets";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultipleUpload, setIsMultipleUpload] = useState(false);

  const handleUploadClick = (multiple: boolean) => {
    setIsMultipleUpload(multiple);
    setIsModalOpen(true);
  };

  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Welcome to Video Uploader
        </h1>
        <div className="space-x-4">
          <Button onClick={() => handleUploadClick(false)}>
            Upload Single Video
          </Button>
          <Button variant="secondary" onClick={() => handleUploadClick(true)}>
            Upload Multiple Videos
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isMultipleUpload
                ? "Upload Multiple Videos"
                : "Upload Single Video"}
            </DialogTitle>
          </DialogHeader>
          <UploadVideo
            onUploadSuccess={() => setIsModalOpen(false)}
            isMultiple={isMultipleUpload}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
