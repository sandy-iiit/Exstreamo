package com.youtubeclone.backend.controller;

import com.youtubeclone.backend.dto.UploadVideoResponse;
import com.youtubeclone.backend.dto.VideoDto;
import com.youtubeclone.backend.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
@CrossOrigin
public class VideoController {

    private final VideoService videoService;
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file")MultipartFile file){
           return videoService.uploadVideo(file);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("thumbnail")MultipartFile thumbnail,
                                  @RequestParam("videoId") String videoId){
       return videoService.uploadThumbnail(thumbnail,videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDto editVideoMetaData(@RequestBody VideoDto videoDto){

        return videoService.editVideo(videoDto);
    }

    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto getVideoDetails(@PathVariable String videoId){
        return videoService.getVideoDetails(videoId);
    }
}
