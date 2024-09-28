class VideoApi {
  private readonly STORAGE_KEY = "upload-videos-key";

  addVideosToLocalStorage(videos: Video[]): void {
    const existingVideos = this.getVideosFromLocalStorage();
    existingVideos.push(...videos);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingVideos));
  }

  getVideosFromLocalStorage(): Video[] {
    const storedVideos = localStorage.getItem(this.STORAGE_KEY);
    return storedVideos ? JSON.parse(storedVideos) : [];
  }
}

export interface Video {
  name: string;
  url: string;
}

export const videoApi = new VideoApi();
