package com.youtubeclone.backend.service;

import com.youtubeclone.backend.dto.UploadVideoResponse;
import com.youtubeclone.backend.models.Video;
import com.youtubeclone.backend.dto.VideoDto;
import com.youtubeclone.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService{

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    public UploadVideoResponse uploadVideo(MultipartFile file){

        String videoUrl=s3Service.uploadFile(file);
        var video=new Video();
        video.setVideoUrl(videoUrl);
       var savedVideo= videoRepository.save(video);

       return new UploadVideoResponse(savedVideo.getId(),savedVideo.getVideoUrl());

    }

    public VideoDto editVideo(VideoDto videoDto) {
        var savedVideo=getVideoById(videoDto.getId());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnail(videoDto.getThumbnail());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());

        videoRepository.save(savedVideo);
        return videoDto;
    }

    public String uploadThumbnail(MultipartFile thumbnailFile, String videoId) {
        var savedVideo=getVideoById(videoId);

        String thumbnailUrl=s3Service.uploadFile(thumbnailFile);

        savedVideo.setThumbnail(thumbnailUrl);

        videoRepository.save(savedVideo);

        return thumbnailUrl;


    }

    Video getVideoById(String id){
        return videoRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Cannot find the video by id= "+id));

    }

    public VideoDto getVideoDetails(String videoId) {
        Video savedVideo=getVideoById(videoId);
        VideoDto videoDto=new VideoDto();
        videoDto.setDescription(savedVideo.getDescription());
        videoDto.setVideoStatus(savedVideo.getVideoStatus());
        videoDto.setTags(savedVideo.getTags());
        videoDto.setVideoUrl(savedVideo.getVideoUrl());
        videoDto.setThumbnail(savedVideo.getThumbnail());
        videoDto.setId(savedVideo.getId());
        videoDto.setTitle(savedVideo.getTitle());

        return videoDto;

    }
}
