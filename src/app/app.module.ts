import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InjectSessionInterceptor } from '@core/interceptors/inject-token.interceptor';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    CookieService, 
    {
      provide:HTTP_INTERCEPTORS, useClass: InjectSessionInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
