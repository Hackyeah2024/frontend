import { RequestVideo, VideoDTO } from "./types";

export class VideoDataMapper {
  static toDTO(video: RequestVideo): VideoDTO {
    return {
      id: video.id,
      name: video.name,
      url: video.url,
      createdAt: video.createdAt,
    };
  }
}
