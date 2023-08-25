import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {VgCoreModule} from "@videogular/ngx-videogular/core";

import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatLegacyCardModule} from "@angular/material/legacy-card";
// import {VgCoreModule} from "ngx-videogular";
// import { VgMediaModule } from '@videogular/ngx-videogular/core';

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    SaveVideoDetailsComponent,
    VideoPlayerComponent,
    VideoDetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    VgCoreModule,
    VgCoreModule,
    AuthConfigModule,
    MatSidenavModule,
    MatListModule,
    MatLineModule,
    MatLegacyCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
