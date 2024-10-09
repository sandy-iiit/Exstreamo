import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { VideoService } from "../video.service";
import { MatSnackBar } from "@angular/material/snack-bar"; // You can replace this with a custom notification service
import { VideoDto } from "../video-dto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params["videoId"];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log(data.videoUrl)
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    });
    this.saveVideoDetailsForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      videoStatus: new FormControl(''),
    });
  }

  add(tag: string): void {
    const value = tag.trim();
    if (value) {
      this.tags.push(value);
    }
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(() => {
        this.matSnackBar.open("Thumbnail Upload Successful", "OK");
      });
  }

  saveVideo() {
    const videoMetaData: VideoDto = {
      id: this.videoId,
      title: this.saveVideoDetailsForm.get('title')?.value,
      description: this.saveVideoDetailsForm.get('description')?.value,
      tags: this.tags,
      videoStatus: this.saveVideoDetailsForm.get('videoStatus')?.value,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      likeCount: 0,
      dislikeCount: 0,
      viewCount: 0
    };
    this.videoService.saveVideo(videoMetaData).subscribe(() => {
      this.matSnackBar.open("Video Metadata Updated successfully", "OK");
    });
  }
}
