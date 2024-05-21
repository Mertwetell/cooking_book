import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
  constructor(private http: HttpClient) { }

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
}
