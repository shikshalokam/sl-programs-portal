import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth-service/auth.service';
import { SidenavComponent, GlobalConfigurationService, UtilityService } from 'shikshalokam';
import { environment } from 'src/environments/environment';
import { GlobalConfig } from '../../global-config';
import { ApiInterceptor } from '../interceptor-service/interceptor.service';
import { async } from '@angular/core/testing';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { reject } from 'q';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate ,CanActivateChild {

  constructor(private apiInterceptor:ApiInterceptor , private utiity : UtilityService ,private authService: AuthService,private snackBar: MatSnackBar, private router: Router ,private globalConfigService : GlobalConfigurationService) { }
  url ;
  canAcess ;
  // canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(! this.authService.keycloakAuth.authenticated){
      //console.log(this.authService.keycloakAuth.authenticated + "before login");
      this.authService.getLogin();
    }
    if(this.authService.keycloakAuth.authenticated){
      //console.log(this.authService.keycloakAuth.authenticated +  "after login");

    if(! JSON.parse(localStorage.getItem('canAcess'))){
      // console.log(! JSON.parse(localStorage.getItem('canAcess')))
        return this.getRoleAcess().then( () => {
          //console.log(localStorage.getItem('canAcess'))
          let url: string = state.url;
        this.url = state.url;
        this.canAcess = JSON.parse(localStorage.getItem('canAcess'));
        return ( this.roleAecss(this.url) );
         } );

     
    }
    else {
    let url: string = state.url;
    this.url = state.url;
    this.canAcess = JSON.parse(localStorage.getItem('canAcess'));
    return ( this.roleAecss(this.url) );
    }
  }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if(! this.authService.getCurrentUserDetails){
      //   this.authService.keycloakAuth.login();
      // }
      // if(! JSON.parse(localStorage.getItem('canAcess'))){
      //   //console.log(! JSON.parse(localStorage.getItem('canAcess')))
  
      //   this.getRoleAcess();
      // }
      // else{
      let url: string = state.url;
      this.url = state.url;
      this.canAcess = JSON.parse(localStorage.getItem('canAcess'));
      return ( this.roleAecss(this.url) );
  // }
}

  
  // checkLogin(){
  //   //console.log("auth")
  //   if(this.authService.getCurrentUserDetails()){
  //     return true;
  //   }
  //   else{
  //     this.authService.keycloakAuth.login();
  //     // return false;
  //   }
  // }
  roleAecss(url){
    let flag = false ;  
   
    this.canAcess.forEach(element => {
      if(url.includes(element))  {
        flag =true;
      }
    });
    return flag;
  }

  checkProgarmId(url){
    if(url.includes('/assessments') ){
      if(localStorage.getItem('currentProgram') === null){
        // this.router.navigate(['/programs']);
        return false;
      }
      return true;
    }
    return true;
  }

  checkUser(url: string) {
    if (url.includes("parent")) {
      if (this.authService.userName == 'Sandeep') {
        return true;
      }
      //this.snackBar.open("Unauthorized Access", "Ok", {duration: 3000});
      return false;
    }
    else {
      if (this.authService.userName == 'Mouneesh') {
        return true;
      }
      //this.snackBar.open("Unauthorized Access", "Ok", {duration: 3000});
      return false;

    }

  }
  getRoleAcess () {

    
    this.canAcess = [];

    const myPromise = new Promise((resolve, reject) => {
      // console.log(JSON.parse(localStorage.getItem('canAcess')));
      // if(!JSON.parse(localStorage.getItem('canAcess'))) { 
      this.utiity.loaderShow();

      this.globalConfigService.getRolePermission(environment.apibaseurl + GlobalConfig.acessAccordingRole)
        .subscribe(data => {
          //console.log(this.globalConfigService.getUniqueRoleAcessObject(data['result'], GlobalConfig.currentPortal))
          console.log(data);
          this.canAcess = this.globalConfigService.getUniqueRoleAcessObject(data['result'], GlobalConfig.currentPortal);
          this.canAcess.push('home');
          localStorage.removeItem('canAcess');
          //console.log(this.canAcess);
          //console.log(localStorage.getItem('canAcess'))
          localStorage.setItem('canAcess', JSON.stringify(this.canAcess));
          ////console.logthis.roleAcess)
          //console.log(this.canAcess)
      this.utiity.loaderHide();
        
          return resolve();

        },
          error => {
      this.utiity.loaderHide();
  
            //this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
            return reject();
          }
        )
      // }
      //  return resolve();
  }); 
 return myPromise;

  }
  //
  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   return this.canActivate(route, state);
  // }

  /* . . . */
}