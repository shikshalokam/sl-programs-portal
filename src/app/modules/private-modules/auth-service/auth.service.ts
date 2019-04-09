import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Observable } from 'rxjs';

declare var Keycloak: any;

@Injectable({
  providedIn:'root'
})
export class AuthService {
  isLoggedIn =false;
  redirectUrl:string;
  userName : string;
  public loginUserDetail = new Subject<any>();
  constructor( private jwtHelper :JwtHelperService) { }

   keycloakAuth: any;
  

  init(): Promise<any> {
    console.log("called auth")
    return new Promise((resolve, reject) => {
      const config = {
        'url': environment.keycloak.url,
        'realm': environment.keycloak.realm,
        'clientId': environment.keycloak.clientId
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init()
        .success(() => {
          ////console.log"seting")
          localStorage.setItem('auth-token',this.keycloakAuth.token)
          localStorage.setItem('downloadReport-token',environment.downloadReportHeaderValue)
          console.log(" key clock success")
          this.loginUserDetail.next({keyClockSuccess : true });
          console.log(this.keycloakAuth)
          resolve();
        })
        .error(() => {
          // this.loginUserDetail.next({keyClockSuccess : false });

          reject();
        });
    });
  }
  
  getToken(): string {
    return this.keycloakAuth ? this.keycloakAuth.token : null;
  }

  checkForLogin() {
    this.keycloakAuth.token ? this.keycloakAuth.login() : null;
  }

  getCurrentUserDetails() {
    // this.userName = jwt_decode(this.keycloakAuth.token).name;
    // return jwt_decode(this.keycloakAuth.token);
    return this.jwtHelper.decodeToken(this.getToken());
   
  }
//   getLoginUser(): Observable<any> {
//     return this.loginUserDetail.asObservable();
// }
  getLogout(){
    // localStorage.clear();
   return this.keycloakAuth.logout();
  }
  getLogin(){
    return this.keycloakAuth.login();
  }



}
