import { Locale } from './../../../../services/i18n.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';

@Component({
  selector: 'app-event-calendar-box',
  templateUrl: './event-calendar-box.component.html',
  styleUrls: ['./event-calendar-box.component.scss']
})
export class EventCalendarBoxComponent implements OnInit {
  @HostBinding('class.c-event-calendar-box') readonly cClass: boolean = true;

  currentLocale: Locale;

  @Input() set enabledDays(value: {year: number, month: number, day: number}[]) {
    this.calendarOptions.disableDateRanges = [
      {begin: {year: 1900, month: 1, day: 1}, 
       end: {year: 2200, month: 12, day: 31}}
    ];
    this.calendarOptions.enableDays = value;
  }

  today = new Date();
  todayDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()};
  @Input() defaultDate: {year: number, month: number, day: number} = this.todayDate;
  
  public calendarOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    inline: true,
    selectorWidth: "100%",
    selectorHeight: "400px",
    showTodayBtn: false,
    monthSelector: false,
    yearSelector: false,
    disableHeaderButtons: true,  
  };

  constructor(
    private appControllerService: AppControllerService,
    private dialogRef: MatDialogRef<EventCalendarBoxComponent>
  ) { }

  ngOnInit() {
    this.appControllerService.i18nService.currentLocale$.subscribe( locale => this.currentLocale = locale);
  }

  close(){
    this.dialogRef.close();
  }

  dateChangedHandler(event:any) {
    this.dialogRef.close(event);
  }

}
