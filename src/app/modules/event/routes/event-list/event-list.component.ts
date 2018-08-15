import { EventService } from './../../services/event.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { EventCalendarBoxComponent } from './../../components/event-calendar-box/event-calendar-box.component';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventMoodSelectBoxComponent } from '../../components/event-mood-select-box/event-mood-select-box.component';
import { ListEvent } from '../../../../interface/list-event';
import * as moment from 'moment';
import { EventSearchService } from '../../services/event-search.service';
import { ListEventListType } from '../../../../enum/list-event-list-type.enum';
import { ScrollContainerComponent } from '../../../base/components/scroll-container/scroll-container.component';
import { CmsAttribute } from '../../../../interface/cms-attribute';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @HostBinding('class.r-event-list') readonly cClass = true;
  @ViewChild(ScrollContainerComponent) scrollContainer: ScrollContainerComponent;

  listEvents: ListEvent[] = [];
  listType: ListEventListType;
  selectedMood: CmsAttribute;

  cal: MatDialogRef<EventCalendarBoxComponent>;
  moodSelectBoxDialog: MatDialogRef<EventMoodSelectBoxComponent>;

  dateFilters = [
    { isSelected: false, title: 'DATE_FILTER.TODAY', value: 'SearchToday' },
    { isSelected: true, title: 'DATE_FILTER.THIS_WEEK', value: 'SearchThisWeek' },
    { isSelected: false, title: 'DATE_FILTER.THIS_WEEKEND', value: 'SearchThisWeekend' },
    { isSelected: false, title: 'DATE_FILTER.SELECT_DAY', value: 'SelectDay' },
  ];

  filterText: string;
  selectedFilter = 'SearchThisWeek';

  constructor(
    private appControllerService: AppControllerService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    private eventService: EventService,
    private eventSearchService: EventSearchService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
        this.listType = data.listType;
        if (this.listType === ListEventListType.ByMood) {
          setTimeout(() => {
            this.openMoodSelectionBox(null);
          }, 100);
        } else {
            this.onFilterSelected(this.selectedFilter);
        }
    });

    this.appControllerService.i18nService.currentLocale$.subscribe(locale => {
      if (locale && locale.code) moment.locale(locale.code);
    });
  }

  // View Actions

  navigateToEventDetail(e) {
    if (e && e.CmsEventCard && e.CmsEventCard.CmsContentId) {
      this.router.navigate(['event/detail', e.CmsEventCard.CmsContentId]);
    }
  }

  openMoodSelectionBox(e) {
    this.moodSelectBoxDialog = this.dialog.open(EventMoodSelectBoxComponent, {
        hasBackdrop: false,
        panelClass: ['cdk-overlay-pane--main', 'cdk-overlay-pane--dark']
      });
      this.moodSelectBoxDialog.afterClosed().subscribe(result => {
        if (result) {
          this.selectedMood = result;
            this.searchByAttribute();
        } else {
            if (!this.selectedMood) this.router.navigate(['event/list/by-date']);
        }
    });
    this.changeDetector.detectChanges();
  }

  onFilterSelected(type) {
    if (!type) return;
    switch (type) {
      case 'SearchToday':
          this.searchToday();
          this.setSelectedFilter(type);
          break;
      case 'SearchThisWeekend':
          this.searchThisWeekend();
          this.setSelectedFilter(type);
          break;
      case 'SelectDay':
      const previousFilter = this.selectedFilter;
          this.cal = this.dialog.open(EventCalendarBoxComponent, {
              hasBackdrop: false,
              panelClass: ['cdk-overlay-pane--main', 'cdk-overlay-pane--dark']
          });
          this.cal.afterClosed().subscribe(result => {
              if (result && result.date) {
                  const {day, month, year} = result.date;
                  const selectedDate = moment({day: day, month: month - 1, year: year});
                  this.searchByDate(selectedDate);
                  this.setSelectedFilter(type);
              } else {
                this.setSelectedFilter(previousFilter);
              }
          });
          break;
      case 'SearchThisWeek':
      default:
          this.searchThisWeek();
          this.setSelectedFilter(type);
          break;
    }
  }

  // Service Calls

  private searchByAttribute() {
    this.eventSearchService.searchByAttribute(this.selectedMood.AttributeId).then(response => {
      this.setListEvents(response);
    });
    this.filterText = `${this.selectedMood.Attribute}`;
  }

  private searchToday() {
    this.eventService.searchToday().then(response => {
      this.setListEvents(response);
    });
    this.filterText = moment().format('Do MMM');
  }

  private searchThisWeekend() {
    this.eventService.searchThisWeekend().then(response => {
      this.setListEvents(response);
    });
    this.filterText = `${moment().day(6).format('Do MMM')}-${moment().day(7).format('Do MMM')}`;
  }

  private searchThisWeek() {
    this.eventService.searchThisWeek().then(response => {
      this.setListEvents(response);
    });
    this.filterText = `${moment().startOf('week').format('Do MMM')}-${moment().endOf('week').format('Do MMM')}`;
  }

  private searchByDate(selectedDate: moment.Moment) {
    const dateRange = {
        StartDate: selectedDate.startOf('day').toISOString(),
        EndDate: selectedDate.endOf('day').toISOString()
    };
    this.eventService.searchByDate(dateRange).then(response => {
        this.setListEvents(response);
    });
    this.filterText = `${selectedDate.format('Do MMM')}`;
  }

  // Helpers

  private setListEvents(response) {
    if (!response) return;
    this.listEvents = response;
    this.scrollContainer.scrollTop();
  }

  private setSelectedFilter(e) {
    this.dateFilters.forEach(f => {
      if (f.value === e) {
        f.isSelected = true;
        this.selectedFilter = f.value;
      } else {
        f.isSelected = false;
      }
    });
  }

}
