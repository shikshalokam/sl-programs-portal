
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
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

  constructor(private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let linkId;
    let name;
    this.route.queryParams.subscribe(params => {
      linkId = params['linkId'];
      name = params['componentName']
    })
    if (linkId && !name) {
      req = req.clone({ setHeaders: { "linkId": linkId } });
    }
    if (linkId && name) {

      req = req.clone({ setHeaders: { "linkId": linkId } }).clone({ setHeaders: { "reportName": name } });
    }
    else {
      const downloadReportUrl = 'programsSubmissionStatus/DCPCR?evidenceId='
      const authToken = this.authService.getToken();
      if (req.url.includes(downloadReportUrl)) {
        req = req.clone({ setHeaders: { "internal-access-token": localStorage.getItem('downloadReport-token') } });
        // return next.handle(authReq);
      }
      else {
        req = req.clone({ setHeaders: { "X-authenticated-user-token": authToken } })

      }
    }
    return next.handle(req)
      // .pipe(
      //   catchError( (error: HttpErrorResponse) => { 

      //      if(error.message.includes( "unauthorized")){
      //         //this.snackBar.open("Session TimeOut , Login to continue" ,"ok" , { duration: 3000 });
      //        this.authService.getLogout();
      //      }
      //      return throwError(error);
      //    })
      // )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status == 200) {
            return throwError(error)
          }
          else {
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              errorMessage = `${error.status}  ${error.statusText}`
            }
            // window.alert(errorMessage);
            this.snackBar.open(errorMessage, "ok", { duration: 6000 });
            return throwError(error);
          }
        })
      )

  }

}
