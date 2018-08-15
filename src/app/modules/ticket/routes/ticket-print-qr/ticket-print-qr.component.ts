import { AppControllerService } from './../../../../services/app-controller.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { TicketPrintProgressBoxComponent } from '../../components/ticket-print-progress-box/ticket-print-progress-box.component';

@Component({
  selector: 'app-ticket-print-qr',
  templateUrl: './ticket-print-qr.component.html',
  styleUrls: ['./ticket-print-qr.component.scss']
})
export class TicketPrintQrComponent implements OnInit {

  @Input() status: string;
  
  printProgressBox: MatDialogRef<TicketPrintProgressBoxComponent>;
  
  constructor(
    private appControllerService: AppControllerService,
    private dialog: MatDialog,
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ticketService.qrScanStatus$.subscribe( status => {
      if(status) {
        this.status = status.name;
      }else {
        this.status = null;
      }
    });
  }

  startScan() {
    this.ticketService.scanQrCode().then( result => {
      this.qrReadHandler(result);
    }).catch( error => {
      console.log(error);
    });
    //simulate qr read
    // setTimeout(()=>{
    //   window['BarkodOkundu']("barcode-code-ref");
    // }, 5*1000);
  }

  cancel() {
    this.router.navigate(['/ticket']);
  }

  qrReadHandler(event?:any) {
    this.ticketService.getPrintDataByBarcode(event).then( result => {
      this.printTicket(result);
    }).catch( error => {
      this.appControllerService.confirmationService.confirm({
        theme: "error",
        title: this.appControllerService.i18nService.get('TICKET_PRINT_QR.GET_PRINT_DATA_BY_BARCODE.ERROR.TITLE'),
        description: this.appControllerService.i18nService.get('TICKET_PRINT_QR.GET_PRINT_DATA_BY_BARCODE.ERROR.DESCRIPTION'),
        confirmButton: {label: this.appControllerService.i18nService.get('TICKET_PRINT_QR.GET_PRINT_DATA_BY_BARCODE.ERROR.LABEL.OK')}
      }).then( result => this.cancel() );
    });
  }

  printTicket(printData) {
    this.printProgressBox = this.dialog.open(TicketPrintProgressBoxComponent, {
      hasBackdrop: false,
      panelClass: ['cdk-overlay-pane--modal'],
      data: {
        role: TicketPrintProgressBoxComponent.ROLE_QR,
        printData: printData
      }
    });
    this.printProgressBox.afterClosed().subscribe( result => {
      if(result) {
        switch(result.nextAction) {
          case "logout":
            this.cancel();
          break;
          case "gotoNewPrint":
          break;
        }
      }
    });
  }

}
