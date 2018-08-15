import { Component, OnInit, HostBinding, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { AppControllerService } from './../../../../services/app-controller.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @HostBinding('class.c-button') readonly cClass: boolean = true;

  @HostBinding('class.c-button--primary') isPrimary: boolean = true;

  @HostBinding('class.c-button--secondary') isSecondary: boolean;

  @HostBinding('class.c-button--info') isInfo: boolean;

  @HostBinding('class.c-button--dark') isDark: boolean;

  @HostBinding('class.c-button--full-width') isFullWidth: boolean;

  @HostBinding('class.c-button--autosize') isAutosize: boolean;

  @HostBinding('class.c-button--disabled') @Input() isDisabled:boolean;

  @HostBinding('class.c-button--lg') @Input() isLg:boolean;

  @HostBinding('class.c-button--md') @Input() isMd:boolean = true;

  @HostBinding('class.c-button--sm') @Input() isSm:boolean;

  @HostBinding('class.c-button--no-label') get hasNoLabel():boolean { return !this.label };

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  @HostListener('click', ['$event']) clickHandler(event:any) {
    if(!this.isDisabled){
      this.clickEvent.emit(event);
    }
  }

  @Input() set theme(value: string){
    this.isPrimary = value == "primary";
    this.isSecondary = value == "secondary";
    this.isInfo = value == "info";
    this.isDark = value == "dark";
  }

  @Input() set size(value: string) {
    this.isFullWidth = value == "full-width";
    this.isAutosize = value == "autosize";
    this.isLg = value == "lg";
    this.isMd = value == "md";
    this.isSm = value == "sm";
  }

  @Input() label: string;
  @Input() icon: string;
  @Input() iconUrl: string;
  @Input() rightIcon: string;
  @Input() rightIconUrl: string;

  constructor(
    private appControllerService: AppControllerService
  ) { }

  ngOnInit() {
    
  }

}
