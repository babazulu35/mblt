import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  @HostBinding('class.c-dialog-box') readonly cClass: boolean = true;

  @Input() title: string;
  @Input() icon: string;
  @Input() useThemeOnTitle: boolean;

  @Input() set theme(value: string) {
    this.dialogTheme = value;
    switch(value) {
      case 'error':
        this.icon = "error-circle";
      break;
      case 'warning':
        this.icon = "warning-circle";
      break;
      case 'success':
        this.icon = "success-circle";
      break;
      case 'info':
        this.icon = "info-circle";
      break;
    }
  }

  dialogTheme: string;

  constructor() { }

  ngOnInit() {
  }

}
