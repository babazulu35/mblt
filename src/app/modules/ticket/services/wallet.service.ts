import { TicketType } from './../interfaces/ticket-type.enum';
import { BaseApiService } from './../../../classes/base-api-service';
import { Injectable } from '@angular/core';
import { AppControllerService } from '../../../services/app-controller.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseApiService {

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient
  ) { 
    super(appControllerService, authenticationService, http, BaseApiService.API_BACKSTAGE, 'Wallet/');
  }

  getTickets(type: TicketType) {
    return this.get('GetTickets', [
      {key: "page", value: "0"},
      {key: "pageSize", value: "3"},
      {key: "type", value: type}
    ], null, 'Items');
  }

  getTicket(performanceId: any, type: TicketType) {
    return this.get('GetTicketDetail', [
      {key: 'performanceId', value: performanceId},
      {key: 'type', value: type}
    ], null, null);
  }
}
