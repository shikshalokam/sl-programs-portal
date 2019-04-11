
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class PublicInterceptor implements HttpInterceptor {

constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("public intrceptorcalled")
    const uuid  = localStorage.getItem('uuId');
      const authReq = 
      // req.clone({ setHeaders: { "X-authenticated-user-token": authToken } } )
      req.clone(   {setParams: { "linkId": uuid }} )
        // return next.handle(authReq) 
        return next.handle(req)
  } 
  
}
