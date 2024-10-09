package com.exstreamo.Exstreamo.repository;

import com.exstreamo.Exstreamo.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {

}
