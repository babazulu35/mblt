import { BaseApiService } from './../../../classes/base-api-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppControllerService } from '../../../services/app-controller.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { TicketPrint } from '../interfaces/ticket-print';
import { Ticket } from '../interfaces/ticket';

export interface TicketPrintStatus {
  name: string;
}

export interface QrScanStatus {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseApiService {

  ticketPrintStatus: TicketPrintStatus;
  ticketPrintStatus$: BehaviorSubject<TicketPrintStatus> = new BehaviorSubject(null);

  qrScanStatus: QrScanStatus;
  qrScanStatus$: BehaviorSubject<QrScanStatus> = new BehaviorSubject(null);

  private lastPrintData: any;
  private maxRetryPrintCount: number;
  private printTryIndex: number = 0;

  constructor(
    appControllerService: AppControllerService,
    authenticationService: AuthenticationService,
    http: HttpClient,
    private router: Router
  ) { 
    super(appControllerService, authenticationService, http, BaseApiService.API_BACKSTAGE);
    authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      if(user) {
        this.setEndpoint(`${user.FirmCode}/${user.ChannelCode.toUpperCase()}/Ticketing/`);
        this.setHeader('PublishingPoint', 'MobiletWeb');
      }
    });
    this.maxRetryPrintCount = this.appControllerService.configService.getSettings('settings.print.maxRetryPrintCount');
  }

  setTicketPrintStatus(ticketPrintStatus: TicketPrintStatus) {
    this.ticketPrintStatus = ticketPrintStatus;
    this.ticketPrintStatus$.next(this.ticketPrintStatus);
  }

  setQrScanStatus(qrScanStatus: QrScanStatus) {
    this.qrScanStatus = qrScanStatus;
    this.qrScanStatus$.next(this.qrScanStatus);
  }

  getPrintDataByTickets(tickets: Ticket[]) {
    let ticketPrintList: TicketPrint[];
    if(tickets && tickets.length) {
      ticketPrintList = [];
      tickets.forEach( ticket => {
        ticket.BarcodeInfo.forEach( barcodeInfo => {
          ticketPrintList.push({
            EventName: ticket.PerformanceName,
            EventCode: 'Event Code',
            VenueName: ticket.VenueName,
            EventDate: ticket.PerformanceDate,
            EventFormattedDate: ticket.PerformanceDate,
            RefCode: barcodeInfo.BasketUID,
            CategoryName: "CategoryName",
            SeatInfo: barcodeInfo.SeatNo,
            SeatAllocationType: 0,
            Barcode: barcodeInfo.Barcode,
            TicketBottomDescription: "Ticket Bottom Description",
            GateCode: "Gate Code",
            GateName: barcodeInfo.GateName,
            BlockName: barcodeInfo.BlockName,
            RowNumber: barcodeInfo.RowNumber,
            SeatName: barcodeInfo.SeatNo
          })
        })
      });
    }
    return ticketPrintList;
  }

  getPrintDataByBarcode(barcode: any):Promise<any> {
    return new Promise( (resolve, reject) => {
      //todo: GetPrintTicketInfo service

      //simluate
      resolve(barcode);
      // reject(null);
    });
  }

  print(printData: TicketPrint | TicketPrint[]) {
    if(!printData) {
      this.setTicketPrintStatus(null);
      return;
    };

    let self = this;
    this.lastPrintData = printData;
    this.setTicketPrintStatus({name: "ready"});
    if(!Array.isArray(printData)) printData = [printData];
    this.appControllerService.ecrDeviceService.print(printData, {
      onReady: function() {
        self.setTicketPrintStatus({name: "progress"});
      }
    }).then( result => {
      this.setTicketPrintStatus({name: "success"});
    }).catch( error => {
      this.setTicketPrintStatus({name: "error"});
    });
  }

  retryPrint() {
    if(this.lastPrintData) {
      this.printTryIndex++;
      if(this.printTryIndex < this.maxRetryPrintCount) {
        this.print(this.lastPrintData);
      }else{
        this.printTryIndex = 0;
        this.lastPrintData = null;
        this.setTicketPrintStatus({name: "cancel"});
        this.router.navigate(['/ticket', 'print', 'options']);
      }
    }
  }

  scanQrCode(): Promise<any> {
    return new Promise((resolve, reject)=> {
      let self = this;
    
      this.setQrScanStatus({name: "ready"});
      this.appControllerService.ecrDeviceService.readQR({
        onReady: function() {
          self.setQrScanStatus({name: "progress"});
        }
      }).then( result => {
        this.setQrScanStatus({name: "success"});
        resolve(result);
      }).catch( error => {
        this.setQrScanStatus({name: "error"});
        reject(error);
      });
    })
    
  }

  logout() {
    this.router.navigate(['/']);
  }
}
