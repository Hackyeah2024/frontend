"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@/shared/ui";
import { useRouter } from "next/navigation";

const videos = [
  {
    id: 1,
    name: "Introduction to React",
    createdAt: "2023-09-15",
    duration: "10:30",
    status: "Completed",
  },
  {
    id: 2,
    name: "Advanced CSS Techniques",
    createdAt: "2023-09-20",
    duration: "15:45",
    status: "Failed",
  },
  {
    id: 3,
    name: "JavaScript ES6 Features",
    createdAt: "2023-09-25",
    duration: "12:15",
    status: "Processing",
  },
  {
    id: 4,
    name: "Building RESTful APIs",
    createdAt: "2023-09-30",
    duration: "20:00",
    status: "Completed",
  },
  {
    id: 5,
    name: "Responsive Web Design",
    createdAt: "2023-10-05",
    duration: "18:30",
    status: "Processing",
  },
];
export default function Page() {
  const router = useRouter();

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <h1 className="text-3xl font-bold mb-6">Your Videos</h1>
        <Table>
          <TableCaption>A list of your uploaded videos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow
                onClick={() => router.push(`/videos/${video.id}`)}
                className="cursor-pointer"
                key={video.id}
              >
                <TableCell className="font-medium">{video.id}</TableCell>
                <TableCell>{video.name}</TableCell>
                <TableCell>{video.createdAt}</TableCell>
                <TableCell>{video.duration}</TableCell>
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();

                    //TODO: if failed, show modal to retry
                  }}
                >
                  <Badge
                    variant={
                      video.status === "Completed"
                        ? "default"
                        : video.status === "Processing"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {video.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
