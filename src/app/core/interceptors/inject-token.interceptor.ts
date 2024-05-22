import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';


@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor{
  
  constructor(/*private cookieService: CookieService*/){}
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    try {
     
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDk1YjBhMjYyZjNjZDFhYTgxYTE4ODkiLCJpYXQiOjE3MTYzODA1OTQsImV4cCI6MTcxNjM5NDk5NH0.-NN4A2kR5CtkfVkgBh97tzRCQicsT2csJhI57znvUW8";//this.cookieService.get('token')
     
      let newRequets=req;
      
      if(token==undefined || token.length==0){

        return next.handle(req);
     
      }else{

        let urlRequests:string=newRequets.url;
        
        if( newRequets.url.includes("?")){
          urlRequests+="&";
        }else{
          urlRequests+="?";
          
        }

        urlRequests+=`auth=${token}`;
  
        newRequets=req.clone( {url:urlRequests});
        // console.log("esta es la url", urlRequests);
        //return next.handle(req);
       return next.handle(newRequets);

      }

    } catch (error) {
      console.log("ojo error");
      return next.handle(req);
    
    }
 
  }

}