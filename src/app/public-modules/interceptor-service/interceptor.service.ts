
// import { Injectable } from "@angular/core";
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpInterceptor,
// } from "@angular/common/http";
// import { MatSnackBar } from "@angular/material";
// import { ActivatedRoute } from "@angular/router";

// @Injectable(
//   {
//     providedIn: 'root',
//   }
// )
// export class PublicInterceptor implements HttpInterceptor {

// constructor(private route :ActivatedRoute){}
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     // debugger
//     console.log(req.url)
//     let linkId ;
//     let name;
//   // if(req.url.includes('linkId=')){
//   //   console.log(req.url)
//     this.route.queryParams.subscribe( params => {
//       linkId = params['linkId'];
//       name = params['componentName']
//     })

// // if(req.url.includes('/verify')){
// //   req = req.clone({setHeaders:{"linkId": localStorage.getItem('linkId') }});
// //     return next.handle(req) ;
// // }
//     req = req.clone({setHeaders:{"linkId": linkId }}).clone({setHeaders:{"reportName":name }});
//     debugger
//     return next.handle(req) ;
//   }
  
// }
