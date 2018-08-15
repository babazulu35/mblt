import { HttpClient } from '@angular/common/http';
import { AppControllerService } from './../../../services/app-controller.service';
import { BaseApiService } from './../../../classes/base-api-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { ListEvent } from '../../../interface/list-event';
import { DateRange } from '../../../interface/date-range';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseApiService {

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient
  ) {
    super(appControllerService, authenticationService, http, BaseApiService.API_BACKSTAGE);
    authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      if (user) {
        this.setEndpoint(`${user.FirmCode}/${user.ChannelCode.toUpperCase()}/ElasticEvent/`, 'Results');
        this.setHeader('PublishingPoint', 'MobiletWeb');
      }
    });
  }

  searchByRanking(): Promise<ListEvent[]> {
    return this.post('SearchByRanking', {'Page':0,'PageSize':99});
  }

  searchThisWeek(): Promise<ListEvent[]> {
    return this.post('SearchThisWeek', {'Page': 0, 'PageSize': 99});
  }

  searchThisWeekend(): Promise<ListEvent[]> {
    return this.post('SearchThisWeekend', {'Page': 0, 'PageSize': 99});
  }

  searchToday(): Promise<ListEvent[]> {
    return this.post('SearchToday', {'Page': 0, 'PageSize': 99});
  }

  searchByDate(dateRange: DateRange): Promise<ListEvent[]> {
    return this.post('SearchByDate', {'Page': 0, 'PageSize': 99, 'DateRange': dateRange});
  }

}
