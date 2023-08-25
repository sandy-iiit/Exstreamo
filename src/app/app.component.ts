import {Component, OnInit} from '@angular/core';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {VideoService} from "./services/video.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private oidcSecurityService:OidcSecurityService,private videoService:VideoService) {

  }


  ngOnInit(): void {

    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;
        console.log(isAuthenticated)
      });
  }
}


