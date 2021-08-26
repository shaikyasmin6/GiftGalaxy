import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    //write intercept logic here
   let token= localStorage.getItem("token")
   if(token)
   {
    const clonedReqObj=req.clone({
        headers:req.headers.set("Authorization",`Bearer ${token}`)
    });
    return next.handle(clonedReqObj)
   }
   else
   {
    return next.handle(req)
   }
  }
}
