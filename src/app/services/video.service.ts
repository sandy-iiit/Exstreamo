import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable, tap} from "rxjs";
import {UploadVideoResponse} from "../upload-video/upload-video-response";
import {VideoDto} from "../videodto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  accessToken: string='';

  constructor(private http:HttpClient) { }

  uploadVideo(fileEntry: File):Observable<UploadVideoResponse> {

    const formData=new FormData()
    formData.append("file",fileEntry,fileEntry.name)

    return this.http.post<UploadVideoResponse>("http://localhost:3000/api/videos/",formData)

  }
  uploadThumbnail(fileEntry: File,videoId:string):Observable<String> {

    const formData=new FormData()
    formData.append("thumbnail",fileEntry,fileEntry.name)
    formData.append("videoId",videoId)
    console.log(videoId)

    return this.http.post("http://localhost:3000/api/videos/thumbnail",formData,{
      responseType:"text"
    })

  }

  getVideo(videoId: string): Observable<VideoDto> {
    return this.http.get<VideoDto>(`http://localhost:3000/api/videos/${videoId}`);
  }

  // Update the method to include authorization headers
  saveVideo(videoDto: VideoDto): Observable<any> {
    return this.http.put('http://localhost:3000/api/videos', videoDto);
  }
}
