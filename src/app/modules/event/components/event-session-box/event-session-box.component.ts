import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-event-session-box',
  templateUrl: './event-session-box.component.html',
  styleUrls: ['./event-session-box.component.scss']
})
export class EventSessionBoxComponent implements OnInit {

  constructor() { }

  @HostBinding('class.c-event-session-box') readonly cClass: boolean = true;

  @Input() session;

  @HostBinding('class.c-event-session-box--selected') @Input() isSelected:boolean;

  ngOnInit() {
  }

}
