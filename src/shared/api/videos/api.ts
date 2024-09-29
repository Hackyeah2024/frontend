import { Video } from "./types";

class VideoApi {
  private storageKey = "speechflow-videos";

  saveVideo(video: Video) {
    if (typeof window === "undefined") {
      return;
    }

    const videos = this.getAllVideos();
    videos.push(video);
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(videos.filter(Boolean))
    );
  }

  getAllVideos(): Video[] {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(localStorage.getItem(this.storageKey) ?? "[]");
  }

  getVideo(videoId: string): Video | undefined {
    if (typeof window === "undefined") {
      return undefined;
    }

    return this.getAllVideos().find(
      (video: Video) => video.file_id === videoId
    );
  }
}

export const videoApi = new VideoApi();
