import { LocalStorageService } from 'ngx-store';
import { CrmAuthenticationService } from './crm-authentication.service';
import { BackstageAuthenticationService } from './backstage-authentication.service';
import { User } from './../interface/user';
import { Login } from './../interface/login';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static readonly AUTH_USER_BACKSTAGE: "backstage";
  static readonly AUTH_USER_KIOSK: "kiosk";
  static readonly AUTH_USER_CRM: "crm";
  
  // baseUrl:string = "https://backofficeapi-test.backstage.solutions/api/v1.0";
  // endPoint:string = "/Token";

  // isLoginStorageState$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // isKioskLoggedIn$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  
  constructor(
    public backstageAuthentication: BackstageAuthenticationService,
    public crmAuthentication: CrmAuthenticationService,
    private localStorageService: LocalStorageService
  ) { 
    //this.localStorageService.clear();
  }
  
  hasAuthenticationForUser(authenticatedUserName: string) {
    let hasAuthentication: boolean;
    switch(authenticatedUserName) {
      case AuthenticationService.AUTH_USER_BACKSTAGE:
        hasAuthentication = this.backstageAuthentication.authenticatedUser != null;
      break;
      case AuthenticationService.AUTH_USER_CRM:
        hasAuthentication = this.crmAuthentication.authenticatedUser != null;
      break;
    }
    return hasAuthentication;
  }

  // loginKiosk() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set( 'Accept','application/json').set( 'Accept-Language',"tr-tr")
  //   };

  //   const body =  {
  //       "Username":"mobilet",
  //       "Password":"nirvana",
  //       "grant_type":"refresh_token",
  //       "FirmCode":"MBT",
  //       "ChannelCode":"Web",
  //       "TerminalId": 1,
  //       "ApiKey": 11
  //   }
    
  //   this.http.post<Login>(this.baseUrl + this.endPoint,body,httpOptions).subscribe(loginResult => {
      
  //     this.localStorage.setItem('kiosk',loginResult).subscribe(result => {
  //       if(result) {
  //         this.isLoginStorageState$.next(result);
  //         this.isKioskLoggedIn$.next(result);
  //         this.getKiosk();
  //       }
  //     },error => {
  //       this.errors.handleError(error);
  //       //TODO: Logları Sil
  //       console.log("==LocalStorage Set Error==",error);
  //     })
  //   },error => {
  //     this.errors.handleError(error);
  //     //TODO: Logları Sil
  //     console.log("==Login Post Error ===",error);
  //   })
  // }

  // getKiosk() {

  //   this.http.get<User>(this.baseUrl + '/Account/GetUserInfo').subscribe(userInfo => {
  //     if(userInfo)
  //     this.localStorage.setItem('terminalData',userInfo).subscribe(result => {
  //       if(result) {
  //         console.log("Terminal Info",userInfo);
  //       }
  //     },error => {
  //       this.errors.handleError(error);
  //       //TODO: Logları Sil
  //       console.log("LocalStorage Terminal Data Set Error",error);
  //     })
  //   },error => {
  //     this.errors.handleError(error);
  //     //TODO: Logları Sil
  //     console.log("==GetUserInfı Get Error",error);
  //   })
  // }

}
