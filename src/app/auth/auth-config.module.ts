import { NgModule } from '@angular/core';
import {AuthInterceptor, AuthModule} from 'angular-auth-oidc-client';
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-rlcywm56hpdgvple.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'FOnzLE5ZjEwIuDd4TxIsMHkFr83jBLFC',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes:['http://localhost:3000/'],
          customParamsAuthRequest:{
              audience:'http://localhost:3000/',
          }
        }
      })],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
    exports: [AuthModule],
})
export class AuthConfigModule {}
