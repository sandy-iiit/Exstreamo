import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services/video.service';
import { VideoDto } from '../videodto';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {

  videoId:string=''
  videoUrl:string=''
  videoTitle: string='';
  videoStatus: string='';
  tags: Array<string>=[];
  videoDescription: string='';

  constructor(private videoService:VideoService,private activatedRoute:ActivatedRoute) {
          this.videoId=this.activatedRoute.snapshot.params['videoId']
    this.videoService.getVideo(this.videoId).subscribe(data=>{
      this.videoUrl=data.videoUrl
      this.videoTitle=data.title
      this.videoStatus=data.videoStatus
      this.videoDescription=data.description
      this.tags=data.tags
    })
  }

  loadVideoDetails() {
    this.videoService.getVideo(this.videoId).subscribe(
      data => {
        this.videoUrl = data.videoUrl;
        this.videoTitle = data.title;
        this.videoStatus = data.videoStatus;
        this.videoDescription = data.description;
        this.tags = data.tags;
      },
      error => {
        console.error('Error fetching video details', error);
      }
    );
  }
}
