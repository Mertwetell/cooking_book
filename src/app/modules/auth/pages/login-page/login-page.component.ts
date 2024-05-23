import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;
  currentPath: string = '';
  formType: number = 1;

  constructor(private authService: AuthService, private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.currentPath = this.router.url;

      if (this.currentPath == '/auth/signup') {
        this.formType = 2;
      }

      this.formLogin = new FormGroup (
        {
          email: new FormControl('febo6@febo.com', [
            Validators.required,
            Validators.email
          ]),
          password: new FormControl('123456',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(12)
            ])
        }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value

    if (this.formType == 1) {
      this.authService.sendCredentials(email, password)
      .subscribe(responseOk => {
        const { idToken, expiresIn  } = responseOk
        this.cookie.set('token', idToken, 4, '/')
        this.router.navigate(['/', 'recipes'])
      },
        err => {
          this.errorSession = true
        })
    } else {
      this.authService.registerCredentials(email, password)
      .subscribe(responseOk => {
        const { idToken, expiresIn  } = responseOk

        this.cookie.set('token', idToken, 4, '/')
        this.router.navigate(['/', 'recipes'])
      },
        err => {
          Swal.fire({
            title: "Usuario existente",
            text: "Por favor, registre su usuario con otro Email",
            icon: "warning",
          });
        })
    }
  }
}
