import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate{
  
  constructor (private cookieService:CookieService,private router:Router) {  }
  //: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkCookieSession();
  }

   checkCookieSession():boolean{
    try{
      const isToken:boolean=this.cookieService.check('token');
      const token=this.cookieService.get('token')
      
      console.log('ok', isToken)
      console.log('el valor es', token)
      
      if(token!=undefined && token.length>0){
       return true;
      }else{
        this.router.navigate(['auth']);  
        return false;
      }
       
     // return isToken;

    }catch(ex){
      console.log("algo ocurrio",ex);
      return false;
    }
  }

}