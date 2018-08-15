import { AppControllerService } from './../../../../services/app-controller.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CrmUser } from './../../../../services/crm-authentication.service';
import { Component, OnInit, HostBinding, Input, Inject } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketPrint } from '../../interfaces/ticket-print';

@Component({
  selector: 'app-ticket-print-progress-box',
  templateUrl: './ticket-print-progress-box.component.html',
  styleUrls: ['./ticket-print-progress-box.component.scss']
})
export class TicketPrintProgressBoxComponent implements OnInit {
  static readonly ROLE_QR: string = "qr";
  static readonly ROLE_WALLET: string = "wallet";

  @HostBinding('class.c-ticket-print-progress-box') readonly cClass: boolean = true;

  @Input() status: string;
  @Input() printData: TicketPrint;
  @Input() role: 'qr' | 'wallet';

  user: CrmUser;

  constructor(
    private ticketService: TicketService,
    private appControllerService: AppControllerService,
    private authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<TicketPrintProgressBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.ticketService.ticketPrintStatus$.subscribe( status => {
      if(status) {
        this.status = status.name;
        switch(this.status) {
          case 'cancel':
            this.dialogRef.close();
          break;
          case 'success':
            setTimeout(() => {
              this.dialogRef.close({
                nextAction: "logout"
              });
            }, this.appControllerService.configService.getSettings('settings.print.successResultTimeout'));
          break;
        }
      }else {
        this.status = null;
      }
    });
    this.authenticationService.crmAuthentication.authenticatedUser$.subscribe( user => {
      this.user = user;
    });
    if(this.data) {
      this.printData = this.data.printData;
      this.role = this.data.role;
    }
    this.ticketService.print(this.printData);
  }

  ngOnDestroy() {
    this.ticketService.setTicketPrintStatus(null);
  }

  retry() {
    this.ticketService.retryPrint();
  }

  gotoHome() {
    this.dialogRef.close({
      nextAction: "logout"
    });
  }

  gotoNewPrint() {
    this.dialogRef.close({
      nextAction: "gotoNewPrint"
    });
  }

}
