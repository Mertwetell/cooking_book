import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor{

  constructor(private cookieService: CookieService, private router: Router){}


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
       //.pipe(catchError( this.InvalidTokenManager));
      }

    } catch (error) {
      console.log("ojo error");
      return next.handle(req);

    }

  }

   InvalidTokenManager(error:HttpErrorResponse){
     //console.log("este error",error);
     let {statusText}=error;


      if(statusText=="Unauthorized"){
        this.cookieService.set('token', "", 0, '/');
        console.log("lo mando a login",statusText);
        
        console.log("tokenlimpio",this.cookieService.get('token'));
        //this.router.navigate(['/', 'auth']);
      }
     return throwError( error);
   }

}
