import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-ticket-card',
  templateUrl: './event-ticket-card.component.html',
  styleUrls: ['./event-ticket-card.component.scss']
})
export class EventTicketCardComponent implements OnInit {

  constructor() { }

  performanceName: string;
  performancePrice: number;
  performanceEndDate: string;
  performanceCurrency: string;

  products: any[];

  @Input() set product(value: any) {
    this.performanceName = value.Name;
    this.findMinPrice(value);
  }

  ngOnInit() {
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  findMinPrice(ps) {
    let minPrice = Number.MAX_SAFE_INTEGER;
    let endDate;
    let currency;

    ps.Prices.forEach(price => {
      if (price.Price < minPrice) {
        minPrice = price.Price;
        endDate = price.EndDate;
        currency = ps.Currency.Code;
      }
    });

    this.performancePrice = minPrice;
    this.performanceEndDate = endDate;
    this.performanceCurrency = currency;

  }

}
