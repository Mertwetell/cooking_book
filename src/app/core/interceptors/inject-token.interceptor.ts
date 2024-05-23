import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor{

  constructor(private cookieService: CookieService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try {

      const token=this.cookieService.get('token')

      let newRequets=req;


      console.log("token interceptado",token);
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
