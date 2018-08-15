import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-ticket-sms-progress-box',
  templateUrl: './ticket-sms-progress-box.component.html',
  styleUrls: ['./ticket-sms-progress-box.component.scss']
})
export class TicketSmsProgressBoxComponent implements OnInit {
  @HostBinding('class.c-ticket-sms-progress-box') readonly cClass: boolean = true;


  constructor() { }

  ngOnInit() {
    
  }

}
