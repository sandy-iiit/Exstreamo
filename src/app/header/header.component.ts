import { Component } from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   isAuthenticated: boolean=false;
   constructor(private oidcsecuritySevice:OidcSecurityService) {
   }

   ngOnInit(){
     this.oidcsecuritySevice.isAuthenticated$.subscribe(({isAuthenticated})=>{
       this.isAuthenticated=isAuthenticated
     })
   }

  login() {
    this.oidcsecuritySevice.authorize()
  }

  logout(){
     this.oidcsecuritySevice.logoffAndRevokeTokens()
  }
}
