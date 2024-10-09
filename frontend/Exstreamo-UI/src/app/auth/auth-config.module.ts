import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-rlcywm56hpdgvple.us.auth0.com',
            redirectUrl: "http://localhost:4200/callback",
            clientId: 'FOnzLE5ZjEwIuDd4TxIsMHkFr83jBLFC',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes:["http://localhost:3000/"],
            customParamsAuthRequest:{
              audience:"http://localhost:3000/"
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
