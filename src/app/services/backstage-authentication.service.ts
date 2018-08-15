import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AppControllerService } from './app-controller.service';
import { LocalStorageService } from 'ngx-store';

export interface BackstageUser {
  Id: number;
  FirmCode: string;
  FirmId: number;
  ChannelCode: string;
  ChannelId: number;
  SubChannelId: number;
  TerminalId: number;
  PasswordHash: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Images: string;
  Roles: string[];
  ApiKey: string;
  isReady: boolean;
  PromoterFirmId?:number;
}

export interface BackstageToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface BackstageAccount {
  token: BackstageToken,
  tokenTimestamp: number,
  user?: BackstageUser
}

@Injectable({
  providedIn: 'root'
})
export class BackstageAuthenticationService {
  static readonly LOCAL_STORAGE_KEY:string = "backstage-account";

  apiUrl: string;

  private headers: HttpHeaders;

  authenticatedUser: BackstageUser;
  authenticatedUser$: BehaviorSubject<BackstageUser> = new BehaviorSubject(null);
  account: BackstageAccount;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService,
    private appControllerService: AppControllerService
  ) { 
    this.apiUrl = environment.api.backstage.host + '/' + environment.api.backstage.path;
    this.initHeader();
  }

  login() {
    this.account = this.localStorageService.get(BackstageAuthenticationService.LOCAL_STORAGE_KEY);
    if(this.account) {
      let now = new Date().getTime();
      let elapsedTime = Math.floor((now - this.account.tokenTimestamp) / 1000);
      if(elapsedTime < this.account.token.expires_in) {
        this.setUser(this.account.user);
      }else{
        this.setAccount();
      }
    }else{
      this.setAccount();
    }
  }

  logout() {
    this.account = null;
    this.localStorageService.set(BackstageAuthenticationService.LOCAL_STORAGE_KEY, this.account);
    this.setUser(null);
  }

  setAccount() {
    console.log("set account", this.appControllerService.ecrDeviceService.ecrCommands);
    let params =  {
      "Username": "mobilet",
      "Password": "nirvana",
      "grant_type": "refresh_token",
      "FirmCode": "MBT",
      "ChannelCode": this.appControllerService.ecrDeviceService.ecrCommands.channelCode() || "Web",
      "TerminalId": this.appControllerService.ecrDeviceService.ecrCommands.terminalID() || 1,
      "ApiKey": 11
    }

    let options = {
      headers: this.headers,
      withCredentials: false,
      responseType: 'json' as 'json'
    }
    
    this.appControllerService.loadingService.showLoading(AppControllerService.LOADING_API_REQUEST);
    this.http.post<BackstageToken>(this.apiUrl + '/Token', params, options).subscribe( result => {
      this.account = {
        token: result,
        tokenTimestamp: new Date().getTime()
      }
      this.localStorageService.set(BackstageAuthenticationService.LOCAL_STORAGE_KEY, this.account);
      this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
      this.getUser();
    }, error => {
      this.errorService.handleError(error);
    });
  }

  setUser(user: BackstageUser) {
    this.authenticatedUser = user;
    if(this.account) {
      this.account.user = this.authenticatedUser;
      this.localStorageService.set(BackstageAuthenticationService.LOCAL_STORAGE_KEY, this.account);
    }
    this.authenticatedUser$.next(this.authenticatedUser);
  }

  setHeader(type: string, value: any, encode:boolean = true){
    if(!this.headers) this.headers = new HttpHeaders();
    this.headers = this.headers.set(type, encode ? encodeURIComponent(value) : value);
  }

  private getUser() {
    if(this.account && this.account.token) {
      this.appControllerService.loadingService.showLoading(AppControllerService.LOADING_API_REQUEST);
      this.setHeader('Authorization', `${this.account.token.token_type} ${this.account.token.access_token}`, false);
      
      let options = {
        headers: this.headers,
        withCredentials: true,
        responseType: 'json' as 'json'
      }
      this.http.get(this.apiUrl + '/Account/GetUserInfo', options).subscribe( result => {
        this.setUser(<BackstageUser>result);
        this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
      }, error => {
        this.errorService.handleError(error);
      });
    }
  }

  private initHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'tr-tr',
      'Accept': 'application/json'
    });
  }
}
