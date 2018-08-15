import { BaseApiService } from './../../../classes/base-api-service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { CmsAttribute } from '../../../interface/cms-attribute';
import { AppControllerService } from '../../../services/app-controller.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventCmsContentsService extends BaseApiService {

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient
  ) {
    super(appControllerService, authenticationService, http, BaseApiService.API_CMS, 'Contents/', 'SearchComponentContainerType');
  }

  getCmsAttributes(): Promise<CmsAttribute[]> {
    return this.get('SearchContentType');
  }
}
