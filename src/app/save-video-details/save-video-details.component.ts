import {Component, inject} from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../services/video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../videodto";




@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  title:FormControl=new FormControl("");
  description:FormControl=new FormControl("");
  videoStatus:FormControl=new FormControl("")
  savedVideoDetails:FormGroup
  fileSelected:boolean=false

  selectedFile!:File

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = []
  announcer = inject(LiveAnnouncer);
  selectedFileName: string='';
  videoId: string='';
  videoUrl: string='';
  thumbnailUrl: string='';
  constructor(private _snackBar: MatSnackBar,private activatedRoute:ActivatedRoute,private videoService:VideoService) {
    this.savedVideoDetails=new FormGroup({
      title:this.title,
      description:this.description,
      videoStatus:this.videoStatus,
    })
  }

  ngOnInit(){
    this.videoId=this.activatedRoute.snapshot.params['videoId']
    this.videoService.getVideo(this.videoId).subscribe(data=>{
      this.videoUrl=data.videoUrl
      this.thumbnailUrl=data.thumbnail
      console.log(this.videoUrl)
    })

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }


  onFileUpload(event: Event) {
    const selectedFiles = (event.target as HTMLInputElement)?.files;
    if (selectedFiles && selectedFiles.length > 0) {
      this.selectedFile = selectedFiles[0];
      this.selectedFileName=selectedFiles[0].name
      this.fileSelected=true
    }   }

  onUpload() {
    console.log("clicked")
      this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
        .subscribe(data=>{
          console.log(data)

          this._snackBar.open("Thumbnail uploaded successfully!","OK")
        })
  }

  saveVideo() {
    const videoDto:VideoDto={
      "id":this.videoId,
      "title":this.savedVideoDetails.get('title')?.value,
      "description":this.savedVideoDetails.get('description')?.value,
      "tags":this.tags,
      "videoStatus":this.savedVideoDetails.get('videoStatus')?.value,
      "videoUrl":this.videoUrl,
      "thumbnail":this.thumbnailUrl,
    }
    this.videoService.saveVideo(videoDto).subscribe(data=>{
      this._snackBar.open("Video metadata updated successfully!","OK")
    });
  }
}
