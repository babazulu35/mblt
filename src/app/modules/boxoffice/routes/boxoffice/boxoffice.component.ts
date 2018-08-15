import { MatDialog, MatDialogRef } from '@angular/material';
import { BoxofficeService } from './../../services/boxoffice.service';
import { Component, OnInit } from '@angular/core';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-boxoffice',
  templateUrl: './boxoffice.component.html',
  styleUrls: ['./boxoffice.component.scss'],
  providers:[BoxofficeService]

})
export class BoxofficeComponent implements OnInit {
  eventName:string;
  eventDate:string;
  venueName:string;

  cal: MatDialogRef<InfoBoxComponent>;
  eventInfoDetail:string;
  constructor(
    private boxofficeService:BoxofficeService,
    private dialog:MatDialog
  ) { }

  ngOnInit() {

    this.boxofficeService.eventInfoSubject$.subscribe(eventName => {
      if(eventName) {
        this.eventName = eventName.Name;
        this.eventDate = eventName.DateTime;
        this.venueName = eventName.Venue;
        this.eventInfoDetail = eventName.EventInfo
      }

    });

  }

  eventInfoModal() {
   this.cal =  this.dialog.open(InfoBoxComponent,{  
      hasBackdrop: false,
      panelClass: ['cdk-overlay-pane--main', 'cdk-overlay-pane--light'],})
    
    this.cal.componentInstance.textTitle = this.eventName;
    this.cal.componentInstance.textContent = this.eventInfoDetail
  }




}
