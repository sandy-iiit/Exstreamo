package com.youtubeclone.backend.mappers;

import com.youtubeclone.backend.dto.VideoDto;
import com.youtubeclone.backend.models.Video;
import org.springframework.stereotype.Service;

@Service
public class VideoMapper {
    public VideoDto mapToDto(Video video) {
        return VideoDto.builder()
                .videoId(video.getId())
                .url(video.getVideoUrl())
                .description(video.getDescription())
                .tags(video.getTags())
                .videoName(video.getTitle())
                .videoStatus(video.getVideoStatus())
                .userId(video.getUserId())
                .thumbnailUrl(video.getThumbnail())
                .build();
    }
}