import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
  constructor(private cookieService: CookieService,private http: HttpClient,  private router: Router) { }

  sendCredentials(email: string, password: string): Observable<any> {
    try {
      const body = {
        email,
        password
      }
      return this.http.post(`${this.URL}/auth/login`, body)
    } catch (err) {
      console.log('error', err)
      return of([])
    }
  }

  registerCredentials(email: string, password: string): Observable<any> {
    try {
      const body = {
        email,
        password
      }
      return this.http.post(`${this.URL}/auth/signup`, body)
    } catch (err) {
        return of([])
    }
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('token');
  }

  logOut(){
    this.cookieService.set('token', "", 0, '/');
    this.router.navigate(['/', 'auth']);
  }

   validToken(httpError:HttpErrorResponse){

    let {error}=httpError;


    if(error=="Invalid token"){
      console.log("debe salir")
     this.logOut();
    }

   }

}
