import { AppControllerService } from './../../../../services/app-controller.service';
import { Ticket } from './../../interfaces/ticket';
import { Component, OnInit, HostBinding, Input, HostListener, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {
  @HostBinding('class.c-ticket-card') readonly cClass: boolean = true;

  @HostBinding('class.c-ticket-card--selected') @Input() isSelected: boolean

  @HostListener('click') clickHandler() {
    this.toggleSelect();
  }

  @Output() selectEvent: EventEmitter<{isSelected: boolean, ticket: Ticket}> = new EventEmitter();

  @Input() ticket: Ticket;

  ticketCountInfo: string;

  constructor(
    private appControllerService: AppControllerService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(this.ticket && this.ticket.ProductInfo) {
      let totalCount: number = 0;
      this.ticket.ProductInfo.forEach( productInfo => {
        totalCount += productInfo.Count;
      });
      this.ticketCountInfo = this.ticket.ProductInfo.length == 1 ? totalCount + "x " + this.ticket.ProductInfo[0].ProductName : totalCount + "x " +this.appControllerService.i18nService.get('TICKET_CARD.LABEL.COUNT_INFO');
    }
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
    this.changeDetector.detectChanges();
    this.selectEvent.emit({isSelected: this.isSelected, ticket: this.ticket});
  }

}
