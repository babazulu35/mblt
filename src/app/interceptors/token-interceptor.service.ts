import { Login } from './../interface/login';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  accessToken:string;
  tokenType:string;
  localStorageSet:boolean;

  constructor(private authService: AuthenticationService, private router: Router ) {
   }

  intercept(req,next) {
    return req;
    // console.log(req, next);
    // this.authService.isLoginStorageState$.subscribe(result => {
    //   this.localStorageSet = result;
    // })

    // this.localStorage.getItem<Login>('kiosk').subscribe((kiosk) => {
    //   this.accessToken = kiosk.access_token;
    //   this.tokenType = kiosk.token_type;
    // });

    // let tokenizedReq = req.clone( {
    //   setHeaders: {
    //     Authorization: this.localStorageSet == true ? `${this.tokenType} ${this.accessToken}` : ""
    //   }
    // })
    // return next.handle(tokenizedReq);
  }
}
 