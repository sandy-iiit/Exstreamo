import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {HomeComponent} from "./home/home.component";

const routes:Routes=[
  {path:'upload-video',component:UploadVideoComponent},
  {path:'save-video-details/:videoId',component:SaveVideoDetailsComponent},
  {path:'video-details/:videoId',component:VideoDetailComponent},
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
