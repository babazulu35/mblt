import { AuthenticationService } from './../services/authentication.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppControllerService } from './../services/app-controller.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export class BaseApiService {
  static readonly API_BACKSTAGE: string = 'backstage';
  static readonly API_BOXOFFICE: string = 'boxoffice';
  static readonly API_CMS: string = 'cms';
  static readonly API_MOBILET: string = 'mobilet';

  private host: string;
  private path: string;
  private endpoint: string;
  private apiUrl: string;
  private responseResultKey;

  private headers: HttpHeaders;
  private queryParams: HttpParams;

  private _appControllerService: AppControllerService;
  public get appControllerService(): AppControllerService { return this._appControllerService };

  private authenticationService: AuthenticationService;
  private http: HttpClient;

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient,
    apiName?: string | 'backstage' | 'boxoffice' | 'cms' | 'mobilet',
    endpoint?: string,
    responseResultKey?: string
  ) {
    this._appControllerService = appControllerService;
    this.authenticationService = authenticationService;
    this.http = http;
    this.init(apiName, endpoint, responseResultKey);
  }

  protected init(
    apiName: string | 'backstage' | 'boxoffice' | 'cms' | 'mobilet',
    endpoint: string,
    responseResultKey?: string
  ) {
      this.host = environment.api[apiName].host;
      this.path = environment.api[apiName].path;
      this.setEndpoint(endpoint, responseResultKey);
      this.initHeader();
      this.appControllerService.i18nService.currentLocale$.subscribe( locale => {
        this.setHeader('Accept-Language', locale.culture, false);
      });

      switch (apiName) {
        case 'backstage':
        case 'cms':
        case 'boxoffice':
          this.authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
            if (user) {
              const account = this.authenticationService.backstageAuthentication.account;
              if (account) {
                this.setHeader('Authorization', `${account.token.token_type} ${account.token.access_token}`, false);
              }
            }
          });
        break;
      }
  }

  protected setEndpoint(endpoint: string, responseResultKey?: string) {
    this.endpoint = endpoint;
    this.apiUrl = this.apiUrl = this.host + '/' + this.path + '/' + this.endpoint;
    if(responseResultKey !== undefined) this.responseResultKey = responseResultKey;
  }

  get(endpoint: string | string[], params?: {key: string, value: string | number}[], responseType: any = 'json', responseResultKey?: string): Promise<any> {
    if (!endpoint) endpoint = '';
    if(responseResultKey !== undefined) this.responseResultKey = responseResultKey;
    const url: string = Array.isArray(endpoint) ? this.apiUrl + '/' + endpoint.join('/') : this.apiUrl + endpoint;

    this.queryParams = new HttpParams();
    if (params) params.forEach( item => this.setQueryParam(item.key, item.value));
    const options = {
        url: url,
        headers: this.headers,
        params: this.queryParams,
        withCredentials: false,
        responseType: responseType
    };

    this.appControllerService.loadingService.showLoading(AppControllerService.LOADING_API_REQUEST);

    return new Promise( (resolve, reject) => {
      this.http.get(url, options).subscribe(
        result => {
          if (result instanceof Array) {
            result = result[0];
          }
          resolve(this.map(result));
        }, error => {
          console.log(error);
          reject(error);
          this.handleError(error);
        });
    });
  }

  post(endpoint: string | string[], data?: any, params?: {key: string, value: string | number}[], responseType: any = 'json', responseResultKey?: string): Promise<any> {
    if (!endpoint) endpoint = '';
    if(responseResultKey !== undefined) this.responseResultKey = responseResultKey;
    const url: string = Array.isArray(endpoint) ? this.apiUrl + '/' + endpoint.join('/') : this.apiUrl + endpoint;

    this.queryParams = new HttpParams();
    if (params) params.forEach( item => this.setQueryParam(item.key, item.value));
    const options = {
        url: url,
        headers: this.headers,
        params: this.queryParams,
        withCredentials: false,
        responseType: responseType
    };

    this.appControllerService.loadingService.showLoading(AppControllerService.LOADING_API_REQUEST);

    return new Promise( (resolve, reject) => {
      this.http.post(url, data, options).subscribe(
        result => {
          resolve(this.map(result));
        }, error => {
          reject(error);
          this.handleError(error);
        });
    });
  }

  setQueryParam(type: string, value: any, encode?: boolean) {
    if(!this.queryParams) this.queryParams = new HttpParams();
    this.queryParams = this.queryParams.set(type, encode ? encodeURIComponent(value) : value);
  }

  setHeader(type: string, value: any, encode: boolean = true) {
    if(!this.headers) this.headers = new HttpHeaders();
    this.headers = this.headers.set(type, encode ? encodeURIComponent(value) : value);
  }

  private map(response:any): {} | {}[] {
    this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
    let payload;
    payload = this.responseResultKey && this.responseResultKey.length ? (response[this.responseResultKey] !== undefined ? response[this.responseResultKey] : response) : response;
    return payload;
  }

  private initHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  public handleError(error: Response | any) {
    console.log(error);
    this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
    return Observable.throw(error);
  }

}
