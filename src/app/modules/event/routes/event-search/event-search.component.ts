import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventSearchService } from '../../services/event-search.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})
export class EventSearchComponent implements OnInit {

  items: any[];

  constructor(
    private router: Router,
    private eventSearchService: EventSearchService,
  ) { }

  ngOnInit() {
  }

  close() {
    this.router.navigate(['event/list/by-date']);
  }

  getItems(e) {
    e.preventDefault();
    if (e && e.target && e.target.value && e.target.value.length > 2) {
      this.eventSearchService.autocomplete(e.target.value).then(response => {
        if (response) {
          this.items = response;
        }
      });
    } else {
      this.items = null;
    }
  }

  selectItem(e, item) {
    e.preventDefault();
    if (!item) return;
    this.router.navigate(['event/search/', item]);
  }

}
