
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
import { ActivatedRoute } from "@angular/router";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class ApiInterceptor implements HttpInterceptor {

constructor(private authService :AuthService,
    private snackBar: MatSnackBar,
    private route : ActivatedRoute
  ){
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req.url)
    let linkId ;
    let name;
  if(req.url.includes('linkId=')){
    console.log(req.url)
    this.route.queryParams.subscribe( params => {
      linkId = params['linkId'];
      name = params['componentName']
    })

    
    req = req.clone({setHeaders:{"linkId": localStorage.getItem('linkId') }}).clone({setHeaders:{"reportName":localStorage.getItem('reportName')}});
    return next.handle(req) ;
  }
    const downloadReportUrl = 'programsSubmissionStatus/DCPCR?evidenceId='
    const authToken = this.authService.getToken();
   console.log("private module interceptor")
    if(req.url.includes(downloadReportUrl))
      {
        const authReq = req.clone({setHeaders:{"internal-access-token" : localStorage.getItem('downloadReport-token')}});
        return next.handle(authReq);
      }
      const authReq = req.clone({ setHeaders: { "X-authenticated-user-token": authToken } })
        return next.handle(authReq) 
        .pipe(
          catchError( (error: HttpErrorResponse) => { 
           
             if(error.message.includes( "unauthorized")){
                this.snackBar.open("Session TimeOut , Login to continue" ,"ok" , { duration: 3000 });
               this.authService.getLogout();
             }
             return throwError(error);
           })
        )
  } 
  
}
