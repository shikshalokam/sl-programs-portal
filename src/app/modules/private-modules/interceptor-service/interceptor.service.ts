
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from "../auth-service/auth.service";
import { MatSnackBar } from "@angular/material";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class ApiInterceptor implements HttpInterceptor {

constructor(private authService :AuthService,
    private snackBar: MatSnackBar
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const downloadReportUrl = 'programsSubmissionStatus/DCPCR?evidenceId='
    const authToken = localStorage.getItem('auth-token');
    if(req.url.includes(downloadReportUrl))
      {
        const authReq = req.clone({setHeaders:{"internal-access-token" : localStorage.getItem('downloadReport-token')}});
        return next.handle(authReq);
      }
      const authReq = req.clone({ setHeaders: { "X-authenticated-user-token": authToken } })
        return next.handle(authReq) 
        .pipe(
          catchError( (error: HttpErrorResponse) => { 
           
             console.log(error)
             if(error.message.includes( "unauthorized")){
                this.snackBar.open("Session TimeOut , Login to continue" ,"ok" , { duration: 3000 });
               this.authService.getLogout();
             }
             return throwError(error);
           })
        )
  } 
  
}
