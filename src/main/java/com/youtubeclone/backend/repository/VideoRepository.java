package com.youtubeclone.backend.repository;

import com.youtubeclone.backend.models.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video,String> {

}
