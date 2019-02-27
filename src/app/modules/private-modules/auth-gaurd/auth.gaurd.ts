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


@Injectable({
  providedIn: 'root',
})
// export class AuthGuard implements CanActivate, CanActivateChild {
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private snackBar: MatSnackBar, private router: Router) { }
  url ;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    this.url = state.url;
    return this.checkProgarmId(url);
    // return this.checkUser(url)
  }
  checkProgarmId(url){
    if(url.includes('/assessments') ){
      if(localStorage.getItem('currentProgram') === null){
        this.router.navigate(['/programs']);
        return false;
      }
      return true;
    }

    //   return true;
    // }
    return true;
    
  }
  checkUser(url: string) {
    if (url.includes("parent")) {
      if (this.authService.userName == 'Sandeep') {
        return true;
      }
      this.snackBar.open("Unauthorized Access", "Ok", {duration: 3000});
      return false;
    }
    else {
      if (this.authService.userName == 'Mouneesh') {
        return true;
      }
      this.snackBar.open("Unauthorized Access", "Ok", {duration: 3000});
      return false;

    }

  }
  //
  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   return this.canActivate(route, state);
  // }

  /* . . . */
}