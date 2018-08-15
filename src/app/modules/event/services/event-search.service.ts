import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { ListEvent } from '../../../interface/list-event';
import { BaseApiService } from '../../../classes/base-api-service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { AppControllerService } from '../../../services/app-controller.service';

@Injectable({
  providedIn: 'root'
})
export class EventSearchService extends BaseApiService{

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient,
  ) {
    super(appControllerService, authenticationService, http, BaseApiService.API_BACKSTAGE);
    authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      if (user) {
        this.setEndpoint(`${user.FirmCode}/${user.ChannelCode.toUpperCase()}/CombinedSearch/`);
        this.setHeader('PublishingPoint', 'MobiletWeb');
      }
    });
  }

  autocomplete(queryText: string): Promise<string[]> {
    return this.post('AutoComplete', {'QueryText': queryText}, null, null, null);
  }

  searchByAttribute(attributeId: number): Promise<ListEvent[]> {
    return this.post('SearchByAttribute', {'QueryText': attributeId}, null, null, 'Events');
  }

  search(queryText: string): Promise<ListEvent[]> {
    return this.post('Search', {'QueryText': queryText}, null, null, 'Events');
  }
}
