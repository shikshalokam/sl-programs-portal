import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';

declare var Keycloak: any;

@Injectable({
  providedIn:'root'
})
export class AuthService {
  isLoggedIn =false;
  redirectUrl:string;
  userName : string;
  constructor( private jwtHelper :JwtHelperService) { }

  
  private keycloakAuth: any;

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        'url': environment.keycloak.url,
        'realm': environment.keycloak.realm,
        'clientId': environment.keycloak.clientId
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          console.log("seting")
          localStorage.setItem('auth-token',this.keycloakAuth.token)
          localStorage.setItem('downloadReport-token',environment.downloadReportHeaderValue)

          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }
  
  getToken(): string {
    return this.keycloakAuth.token;
  }

  getCurrentUserDetails() {
    // this.userName = jwt_decode(this.keycloakAuth.token).name;
    // return jwt_decode(this.keycloakAuth.token);
    this.userName = this.jwtHelper.decodeToken(this.getToken()).name;
    return this.jwtHelper.decodeToken(this.getToken());
  }

  getLogout(){
    localStorage.clear();
   return this.keycloakAuth.logout();
  }



}
