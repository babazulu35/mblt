import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {
  @HostBinding('class.c-notification-box') readonly cClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
