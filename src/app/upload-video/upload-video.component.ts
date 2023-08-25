import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {VideoService} from "../services/video.service";
import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  constructor(private videoService:VideoService,private router:Router) {
  }
  public files: NgxFileDropEntry[] = [];
  fileUploaded:boolean=false;
  private fileEntry: FileSystemFileEntry | undefined;
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          this.fileUploaded=true
          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event:any){
    console.log(event);
  }

  public fileLeave(event:any){
    console.log(event);
  }

  onUpload() {

    if(this.fileEntry!==undefined){
      this.fileEntry.file(file=>{
         this.videoService.uploadVideo(file).subscribe(data=>{
           this.router.navigateByUrl("/save-video-details/"+data.videoId)
           console.log("Video uploaded successfully!!")
         })
      })

    }
  }
}
