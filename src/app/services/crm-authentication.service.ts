import { BackstageAuthenticationService } from './backstage-authentication.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ErrorService } from './error.service';
import { AppControllerService } from './app-controller.service';
import { environment } from '../../environments/environment';
import { LocalStorageService } from 'ngx-store';

export interface CrmUserEmail {
  ActivatedDate: string
  CreateDate: string,
  EmailAddress: string,
  GeneralStatus: number,
  Id: number,
  IsActivated: boolean,
  IsDefault: boolean
  LinkUrl: string
  MemberId: number
  Status: number
  UpdateDate: string
  UpdateUser: any
  VerificationCode: string
}

export interface CrmUserPhone {
  ActivatedDate: string,
  AreaCode: string
  CountryCode: string,
  CreateDate: string,
  GeneralStatus: number,
  Id: number,
  IsActivated: boolean,
  IsDefault: boolean,
  LocalNumber: any,
  MemberId: number,
  PhoneNumber: string,
  PhoneType: number,
  Status: number,
  UpdateDate: string,
  VerificationCode: string
}

export interface CrmUser {
  AdditionalColumnValues: any[],
  Email: CrmUserEmail,
  LinkUrl: string,
  MemberAddresses: string,
  MemberChannels: any
  MemberGuid: string,
  MemberId: number,
  MemberLicenses: any,
  MemberSubTypeId: number,
  MemberTypeId: number,
  Name: string,
  NationalIdentityNumber: number
  OnboardingCompleted: boolean
  Password: string,
  Phone: CrmUserPhone,
  Status: number,
  SubStatus: number
  Surname: string
}

export interface CrmToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface CrmAccount {
  token: CrmToken,
  tokenTimestamp: number,
  user?: CrmUser
}

@Injectable({
  providedIn: 'root'
})
export class CrmAuthenticationService {
  static readonly LOCAL_STORAGE_KEY:string = "crm-account";

  apiUrl: string;

  private headers: HttpHeaders;

  authenticatedUser: CrmUser;
  authenticatedUser$: BehaviorSubject<CrmUser> = new BehaviorSubject(null);
  account: CrmAccount;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService,
    private appControllerService: AppControllerService,
    private backstageAuthenticationService: BackstageAuthenticationService
  ) { 
    this.account = this.localStorageService.get(CrmAuthenticationService.LOCAL_STORAGE_KEY);

    this.backstageAuthenticationService.authenticatedUser$.subscribe( backstageUser => {
      if(backstageUser) {
        this.apiUrl = environment.api.crm.host + '/' + environment.api.crm.path + `/${backstageUser.FirmCode}/${backstageUser.ChannelCode.toUpperCase()}/Crm`;
        this.initHeader();
        const account = this.backstageAuthenticationService.account;
        if (account) {
          this.setHeader('Authorization', `${account.token.token_type} ${account.token.access_token}`, false);
        }
      }
    });
  }

  login(username: string, password: string) {
    this.account = this.localStorageService.get(CrmAuthenticationService.LOCAL_STORAGE_KEY);
    if(this.account) {
      let now = new Date().getTime();
      let elapsedTime = Math.floor((now - this.account.tokenTimestamp));
      this.account.token.expires_in = 10*60*1000; //servisten gelen süre doğru şekilde çalışmadığından varsayılan 10 dk'lık bir oturum süresi ayarlandı.
      if(elapsedTime < this.account.token.expires_in) {
        this.setUser(this.account.user);
      }else{
        this.setAccount(username, password);
      }
    }else{
      this.setAccount(username, password);
    }
  }

  logout() {
    this.account = null;
    this.localStorageService.set(CrmAuthenticationService.LOCAL_STORAGE_KEY, this.account);
    this.setUser(null);
  }

  setAccount(username: string, password: string) {
    if(!username || !password) return;
    let params =  {
      "UserName": username,
      "Password": password,
      "grant_type": "password"
    }

    this.appControllerService.loadingService.showLoading(AppControllerService.LOADING_API_REQUEST);

    let formBody:string[] = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let formDataStr = formBody.join("&");

    this.setHeader('Content-Type', 'application/x-www-form-urlencoded', false);
    let options = {
      headers: this.headers,
      withCredentials: false,
      responseType: 'json' as 'json'
    }
    
    this.http.post<CrmToken>(this.apiUrl + '/Auth', formDataStr, options).subscribe( result => {
      this.account = {
        token: result,
        tokenTimestamp: new Date().getTime()
      }
      this.localStorageService.set(CrmAuthenticationService.LOCAL_STORAGE_KEY, this.account);
      this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
      this.getUser();
    }, error => {
      //this.errorService.handleError(error);
      this.appControllerService.confirmationService.confirm({
        title: this.appControllerService.i18nService.get('CRM_AUTH.ERROR.TITLE'),
        description: error.error.Message,
        confirmButton: {label: this.appControllerService.i18nService.get('CRM_AUTH.ERROR.LABEL.OK')}
      }).then( result => {
        this.backstageAuthenticationService.login();
      });
      this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
    });
  }

  setUser(user: CrmUser) {
    this.authenticatedUser = user;
    if(this.account) {
      this.account.user = this.authenticatedUser;
      this.localStorageService.set(CrmAuthenticationService.LOCAL_STORAGE_KEY, this.account);
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
      // this.setHeader('Authorization', `${this.account.token.token_type} ${this.account.token.access_token}`, false);
      this.setHeader('Content-Type', 'application/json', false);
      this.setHeader('PublishingPoint', 'MobiletWeb');
      
      let options = {
        headers: this.headers,
        withCredentials: false,
        responseType: 'json' as 'json'
      }
      this.http.post(this.apiUrl + '/CallService/GetMember', null, options).subscribe( result => {
        this.setUser(<CrmUser>result['EntityModel']);
        this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
      }, error => {
        this.errorService.handleError(error);
      });
    }
  }

  private initHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'tr-tr',
      'Accept': 'application/json, text/plain, */*'
    });
  }
}
