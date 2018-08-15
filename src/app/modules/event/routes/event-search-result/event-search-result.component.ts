import { Component, OnInit, HostBinding } from '@angular/core';
import { ListEvent } from '../../../../interface/list-event';
import { EventSearchService } from '../../services/event-search.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-search-result',
  templateUrl: './event-search-result.component.html',
  styleUrls: ['./event-search-result.component.scss']
})
export class EventSearchResultComponent implements OnInit {

  @HostBinding('class.r-event-search-result') readonly cClass = true;
  listEvents: ListEvent[] = [];
  queryText: string;
  subtitle: string;
  count: number;

  constructor(
    private eventSearchService: EventSearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.queryText = params['key'];
      this.eventSearchService.search(this.queryText).then(response => {
        if (response) {
          this.listEvents = response;
          this.count = this.listEvents.length;
          this.subtitle = `"${this.queryText}" aramasına ait`;
        }
      });
    });
  }

  navigateToEventDetail(e) {
    if (e && e.CmsEventCard && e.CmsEventCard.CmsContentId) {
      this.router.navigate(['event/detail', e.CmsEventCard.CmsContentId]);
    }
  }

}
