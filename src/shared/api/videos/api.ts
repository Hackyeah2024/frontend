import { Video } from "./types";

class VideoApi {
  private storageKey = "speechflow-videos";

  saveVideo(video: Video) {
    const videos = this.getAllVideos();
    videos.push(video);
    localStorage.setItem(this.storageKey, JSON.stringify(videos));
  }

  getAllVideos(): Video[] {
    return JSON.parse(localStorage.getItem(this.storageKey) ?? "[]");
  }

  getVideo(videoId: string): Video | undefined {
    return this.getAllVideos().find((video: Video) => video.id === videoId);
  }
}

export const videoApi = new VideoApi();
