import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../services/authentication.service';
import { TicketService } from './../../services/ticket.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Ticket } from './../../interfaces/ticket';
import { WalletService } from './../../services/wallet.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { Component, OnInit, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TicketType } from '../../interfaces/ticket-type.enum';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TicketSmsProgressBoxComponent } from '../../components/ticket-sms-progress-box/ticket-sms-progress-box.component';
import { TicketPrintProgressBoxComponent } from '../../components/ticket-print-progress-box/ticket-print-progress-box.component';

@Component({
  selector: 'app-ticket-wallet',
  templateUrl: './ticket-wallet.component.html',
  styleUrls: ['./ticket-wallet.component.scss']
})
export class TicketWalletComponent implements OnInit {
  @ViewChildren(TicketCardComponent) ticketCards: TicketCardComponent[];

  isLoading: boolean;

  tickets: Ticket[];
  combineTickets: Ticket[];
  standartTickets: Ticket[];

  selectedTickets: Ticket[];

  footerHeight: number;

  smsProgressBox: MatDialogRef<TicketSmsProgressBoxComponent>;
  printProgressBox: MatDialogRef<TicketPrintProgressBoxComponent>;

  private readonly ticketListTotalRequestCount: number = 2;
  private ticketListRequestIndex: number = 0;

  private ticketDetailQueryList: Ticket[];
  private ticketDetailQueryErrorList: Ticket[];
  private ticketDetailQuerySubscription: Subscription;

  constructor(
    private appControllerServie: AppControllerService,
    private walletService: WalletService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private ticketService: TicketService,
    private authenticationService: AuthenticationService
  ) { 
    this.footerHeight = this.appControllerServie.configService.getSettings('styles.height.footer') * -1;
  }

  ngOnInit() {

    this.walletService.getTickets(TicketType.Standard).then( result => {
      this.standartTickets = result;
      if(this.standartTickets) {
        this.standartTickets.map( ticket => ticket.Type = TicketType.Standard)      
        this.mergeAllTicketTypes();
      }
    }).catch(error => {
      console.log(error);
      this.logout();
    });

    this.walletService.getTickets(TicketType.Combine).then( result => {
      this.combineTickets = result;
      if(this.combineTickets) {
        this.combineTickets.map( ticket => ticket.Type = TicketType.Combine);
        this.mergeAllTicketTypes();
      }
    }).catch(error => {
      console.log(error);
      this.logout();
    });;

    this.appControllerServie.loadingService.activeLoadings$.subscribe( status => {
      this.isLoading = this.appControllerServie.loadingService.getLoadingStatus('query');
      this.changeDetector.detectChanges();
    });
  }

  logout(redirectToHome?:boolean) {
    if(redirectToHome) {
      this.authenticationService.crmAuthentication.logout();
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/ticket', 'wallet', 'logout']);
    }
  }

  sendSmsSelection() {
    this.smsProgressBox = this.dialog.open(TicketSmsProgressBoxComponent, {
      hasBackdrop: false,
      panelClass: ['cdk-overlay-pane--modal']
    });
  }

  printSelection() {
    this.printProgressBox = this.dialog.open(TicketPrintProgressBoxComponent, {
      hasBackdrop: false,
      panelClass: ['cdk-overlay-pane--modal'],
      data: {
        role: TicketPrintProgressBoxComponent.ROLE_WALLET,
        printData: this.ticketService.getPrintDataByTickets(this.selectedTickets)
      }
    });
    this.printProgressBox.afterClosed().subscribe( result => {
      if(result) {
        switch(result.nextAction) {
          case "logout":
            this.logout(true);
          break;
          case "gotoNewPrint":
            this.logout();
          break;
        }
      }
    });
  }

  ticketSelectHandler(event) {
    setTimeout(() => {
      let selectedTicketCards: TicketCardComponent[] = this.ticketCards.filter( ticketCard =>  ticketCard.isSelected );
      this.selectedTickets = [];
      selectedTicketCards.forEach( ticketCard => this.selectedTickets.push(ticketCard.ticket));
      this.changeDetector.detectChanges();
    }, 0);
  }

  private mergeAllTicketTypes() {
    this.tickets = [].concat(this.standartTickets);
    this.tickets = this.tickets.concat(this.combineTickets);
    this.ticketListRequestIndex++;
    if(this.ticketListRequestIndex == this.ticketListTotalRequestCount) {
      this.appControllerServie.loadingService.showLoading('query');
      this.ticketDetailQueryList = JSON.parse(JSON.stringify(this.tickets));
      this.runTicketDetailQuery();
    }
    this.changeDetector.detectChanges();
  }

  private runTicketDetailQuery(){
    if(this.ticketDetailQueryList.length == 0) {
      this.appControllerServie.loadingService.hideLoading('query');
      if(this.ticketDetailQueryErrorList && this.ticketDetailQueryErrorList.length > 0) {
        console.log("Bilet detay sorgulamada bazı biletler hata verdi");
      }
      return;
    }
    let currentTicket: Ticket = this.ticketDetailQueryList.shift();
    this.walletService.getTicket(currentTicket.PerformanceId, currentTicket.Type).then( result => {
      let existTicket: Ticket = this.tickets.find( ticket => ticket.PerformanceId == result.PerformanceId );
      if(existTicket) {
        existTicket.BarcodeInfo = result.BarcodeInfo;
        existTicket.EventInfo = result.EventInfo;
        existTicket.PerformanceInfo = result.PerformanceInfo;
        existTicket.PerformanceVenueLogo = result.PerformanceVenueLogo;
        existTicket.SponsorLogo = result.SponsorLogo;
        existTicket.VenueName = result.VenueName;
        existTicket.UID = result.UID;
      }
      this.runTicketDetailQuery();
    }).catch( error => {
      if(!this.ticketDetailQueryErrorList) this.ticketDetailQueryErrorList = [];
      this.ticketDetailQueryErrorList.push(currentTicket);
      this.runTicketDetailQuery();
    });
  }

}
