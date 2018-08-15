import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './routes/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationBoxComponent } from './components/notification-box/notification-box.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: "event", loadChildren: "./../event/event.module#EventModule"},
      { path: "boxoffice", loadChildren: "./../boxoffice/boxoffice.module#BoxofficeModule"},
      { path: "ticket", loadChildren: "./../ticket/ticket.module#TicketModule"},
      { path: "", redirectTo: "event", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    NotificationBoxComponent,
    ConfirmationBoxComponent
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    NotificationBoxComponent,
    ConfirmationBoxComponent
  ]
})
export class MainModule { }
