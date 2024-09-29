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
import { Upload } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="py-10 flex flex-col items-center justify-center h-full">
      <div className="text-center space-y-4 max-w-7xl mx-auto px-2 md:px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Witaj w Video Uploader
        </h1>
        <div className="space-x-4">
          <Button
            className="inline-flex items-center gap-2"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4" />
            Prześlij wideo
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prześlij wideo</DialogTitle>
          </DialogHeader>
          <UploadVideo onUploadSuccess={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
