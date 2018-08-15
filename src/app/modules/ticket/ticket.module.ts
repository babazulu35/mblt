import { TicketService } from './services/ticket.service';
import { WalletService } from './services/wallet.service';
import { NgModule } from '@angular/core';
import { TicketPrintOptionsComponent } from './routes/ticket-print-options/ticket-print-options.component';
import { TicketWalletLoginComponent } from './routes/ticket-wallet-login/ticket-wallet-login.component';
import { TicketWalletComponent } from './routes/ticket-wallet/ticket-wallet.component';
import { TicketPrintQrComponent } from './routes/ticket-print-qr/ticket-print-qr.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationLostGuardService } from './services/authentication-lost-guard.service';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { TicketPrintProgressBoxComponent } from './components/ticket-print-progress-box/ticket-print-progress-box.component';
import { TicketSmsProgressBoxComponent } from './components/ticket-sms-progress-box/ticket-sms-progress-box.component';

const routes: Routes = [
  { path: 'wallet', component: TicketWalletComponent, canActivate: [AuthGuardService], canDeactivate: [AuthenticationLostGuardService] },
  { path: 'wallet/login', component: TicketWalletLoginComponent },
  { path: 'wallet/logout', component: TicketWalletLoginComponent, data: {status: "logout"} },
  { path: 'print/options', component: TicketPrintOptionsComponent },
  { path: 'print/qr', component: TicketPrintQrComponent },
  { path: '', redirectTo: "print/options", pathMatch: "full" }
];

@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  declarations: [
    TicketPrintOptionsComponent,
    TicketWalletLoginComponent,
    TicketWalletComponent,
    TicketPrintQrComponent,
    TicketCardComponent,
    TicketPrintProgressBoxComponent,
    TicketSmsProgressBoxComponent
  ],
  exports: [
    TicketCardComponent,
    TicketPrintProgressBoxComponent,
    TicketSmsProgressBoxComponent
  ],
  providers: [
    AuthenticationLostGuardService,
    TicketService,
    WalletService
  ],
  entryComponents: [
    TicketPrintProgressBoxComponent,
    TicketSmsProgressBoxComponent
  ]
})
export class TicketModule { }
