import { Component, OnInit } from '@angular/core';
import { TicketService as EventService } from './../../services/ticket.service';

@Component({
  selector: 'app-ticket-options',
  templateUrl: './ticket-options.component.html',
  styleUrls: ['./ticket-options.component.scss'],
  providers:[EventService]
})
export class TicketOptionsComponent implements OnInit {

  constructor(private eventService:EventService) { }

  ngOnInit() {

  }

}
