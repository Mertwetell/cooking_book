import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';


@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor{
  
  constructor(/*private cookieService: CookieService*/){}
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    try {
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDk1YjBhMjYyZjNjZDFhYTgxYTE4ODkiLCJpYXQiOjE3MTYyMTU4OTMsImV4cCI6MTcxNjIzMDI5M30.T-3U2xOWNO2QEXGFM5UCpGqXycBC4kRezFif4M0YsWI";//this.cookieService.get('token')
      let newRequets=req;
      
      if(token!=undefined && token.length>0){
        return next.handle(req);
      }


      let urlRequests:string="";
      if( newRequets.url.includes("?")){
        urlRequests+="&";
      }else{
        urlRequests+="?";
        
      }

      urlRequests+=`auth=${token}`;

      newRequets=req.clone( {url:urlRequests});

      /*{
        setHeaders:{ authorization:`Bearer ${token}` }
      }*/

      return next.handle(newRequets);
    } catch (error) {
      console.log("ojo error");
      return next.handle(req);
    
    }
 
  }


}