import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EventCmsService } from '../../services/event-cms.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { EventCmsContentsService } from './../../services/event-cms-contents.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventCalendarBoxComponent } from './../../components/event-calendar-box/event-calendar-box.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  providers: [DatePipe]
})
export class EventDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cmsService: EventCmsService,
    private appControllerService: AppControllerService,
    private changeDetector: ChangeDetectorRef,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) { }

  eventDetailId: string;
  eventDetail: any;
  eventInfo: any;
  eventInfoId:number;

  products: any[];
  performances: any[];
  performancesToShow: any[];
  dateSelected = [];

  isMultiplePerformance: boolean;

  listEventAssetsCDNSource: string
  largeDateString: string;
  largeDate: Date;

  @Output() sessionSelected: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

    this.eventDetailId = this.activatedRoute.snapshot.params['id'];

    this.cmsService.getEventDetail(this.eventDetailId).then(result => {
      console.log("Result",result);
      this.eventDetail = result;
      this.eventInfo = result.EventComponentContainerType[0];
      this.eventInfoId = result.Nirvana_Event_Info.Id

      this.performances = this.eventDetail.Nirvana_Event_Info.Performances;
      this.performancesToShow = this.performances;
      this.isMultiplePerformance = this.performances.length > 1;

      if (this.performances.length == 1) {
        this.products = this.performances[0].Products;
        this.largeDate = this.performances[0].Date;
      } else {
        this.findClosestDate();
        this.groupPerformancesByDate();
      }

      this.changeDetector.detectChanges();
    });

    this.appControllerService.i18nService.currentLocale$.subscribe(locale => {
      if (locale && locale.code) {
        moment.locale(locale.code);
        if (this.largeDate) {
          this.formatLargeDate();
          if (this.isMultiplePerformance) {
            this.changeLocaleOfPerformanceDates();
          }
        }
      }
    });

    this.listEventAssetsCDNSource = this.appControllerService.configService.getSettings('eventDetailsAssetsCDNSource');

  }

  private getProductsOfSelectedDate(event) {
    let selectedPerformance = event;
    console.log("Selected Performance",selectedPerformance);
    this.products = selectedPerformance.Products;

    this.performancesToShow.forEach(performance => {
      performance.value.forEach(value => {
        if (value.Id == selectedPerformance.Id) {

          this.dateSelected[value.Id] = true;

          this.largeDate = value.Date;
           this.router.navigate(['/boxoffice/basket',this.eventInfoId],{ queryParams: {date:this.largeDate}});
          this.formatLargeDate();
          // ScrollContainer hatası gidermek için
          this.changeDetector.detectChanges();

        } else {
          this.dateSelected[value.Id] = false;
        }
      });
    });

  }

  private findClosestDate(now?: Date) {
    let dates = [];
    if(!now) now = new Date();
    let closest;
    let diffBetweenDates = 0;
    let closestPerf;

    this.performances.sort(this.sortDates);

    for (var i = 0; i < this.performances.length; i++) {
      let perf = this.performances[i];
      let date = new Date(perf.Date);

      if (date >= now) {
        closest = date;

        closestPerf = perf;
        this.products = perf.Products;
        this.largeDate = perf.Date;

        break;
      } else {
        let diff = now.getUTCMilliseconds() - date.getUTCMilliseconds();
        if (diff <= diffBetweenDates ||  diffBetweenDates == 0) {
          diffBetweenDates = diff;
          closest = date;
          closestPerf = perf;

          this.products = perf.Products;
          this.largeDate = perf.Date;
        }

      }
    }

    closestPerf.isSelected = true;
    this.largeDate = closestPerf.Date;
    this.formatLargeDate();

  }

  private formatLargeDate() {
    this.largeDateString = moment(this.largeDate).format('dddd, DD MMM YYYY, HH:mm');
  }

  private sortDates(a, b) {
    return new Date(a.Date).getTime() - new Date(b.Date).getTime();
  }

  private groupPerformancesByDate(returnPerformances?: boolean) {

    let performances = [];

    this.performances.forEach(perf => {
      // let date = this.datePipe.transform(perf.Date, 'dd MMMM yyyy');
      let date = moment(perf.Date).format('DD MMMM YYYY');
      if (this.contains(performances, date)) {
        this.addToArray(performances, date, perf);
      } else {
        performances.push({
          key: date,
          value: [perf]
        });
      }
    });

    if(returnPerformances) return performances;

    // this.performances = performances;
    this.performancesToShow = performances.filter(perf => {
      return perf.key == moment(this.largeDate).format('DD MMMM YYYY');
    });

    this.performancesToShow[this.performancesToShow.length - 1].value.isSelected = true;

  }

  private changeLocaleOfPerformanceDates() {
    if(this.isMultiplePerformance){
      this.performancesToShow.forEach(perf => {
        let date = perf.value[0].Date;
        perf.key = moment(date).format('DD MMMM YYYY');
      });
    }
  }

  private contains(array, key) {
    for (let i = 0; i < array.length; i++) {

      if (array[i].key == key) {
        return true;
      }
    }
    return false;
  }

  private addToArray(array, key, performance) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].key == key) {
        array[i].value.push(performance);
        break;
      }
    }
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  openBuyTicketModal() {
    this.router.navigate(['/boxoffice/basket',this.eventInfoId]);
  }

  cal: MatDialogRef<EventCalendarBoxComponent>;
  openSelectDateDialog() {

    let enabledDays = [];
    this.groupPerformancesByDate(true).forEach(perfs => {
      let date = new Date(perfs.value[0].Date);
      enabledDays.push({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
    });

    this.cal = this.dialog.open(EventCalendarBoxComponent, {
      hasBackdrop: false,
      panelClass: ['cdk-overlay-pane--main', 'cdk-overlay-pane--dark'],
    });

    let calendarInstance = this.cal.componentInstance;
    let defaultDate = new Date(this.largeDate);

    calendarInstance.enabledDays = enabledDays;
    calendarInstance.defaultDate = {year: defaultDate.getFullYear(), 
                                    month: defaultDate.getMonth() + 1,
                                    day: defaultDate.getDate()};
    

    this.cal.afterClosed().subscribe(result => {
      if (result && result.date) {
        const { day, month, year } = result.date;
        const selectedDate = moment({ day: day, month: month - 1, year: year }).toDate();
        this.findClosestDate(selectedDate);
        this.groupPerformancesByDate();
      } else {

      }
    });
  }

}
