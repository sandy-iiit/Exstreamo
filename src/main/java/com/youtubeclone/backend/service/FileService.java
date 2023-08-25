package com.youtubeclone.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    public String uploadFile(MultipartFile file);
}
