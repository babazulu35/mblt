import { BaseApiService } from './../../../classes/base-api-service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { AppControllerService } from '../../../services/app-controller.service';

@Injectable({
  providedIn: 'root'
})
export class EventCmsService extends BaseApiService {

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient
  ) {
    super(appControllerService, authenticationService, http, BaseApiService.API_CMS, 'Content/');
    this.setHeader('PublishingPoint', 'MobiletWeb');
  }

  getEventDetail(id: string): Promise<any> {
    return this.get(id);
  }
}
