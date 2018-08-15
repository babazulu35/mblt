import { Component, OnInit, HostBinding, Input, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit, AfterContentInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss']
})
export class ScrollContainerComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {
  @ViewChild('content') content: ElementRef;

  @HostBinding('class.c-scroll-container') readonly cClass: boolean = true;

  @Input() navOffsetX: number = 20;
  @Input() navOffsetY: number = 0;
  @Input() offsetHeight: number = 0;
  @Input() height: number = 768;

  contentHeight: number;

  get hasScroll(): boolean {
    let hasScroll: boolean = this.content ? this.content.nativeElement.scrollHeight > this.content.nativeElement.offsetHeight : false;
    return hasScroll;
  }

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.calculateSize();
  }

  ngAfterContentInit() {
    this.calculateSize();
  }

  ngOnChanges(changes) {
    if(changes && (changes.height || changes.offsetHeight)) this.calculateSize();
  }

  calculateSize() {
    let selfRect = this.elementRef.nativeElement.getBoundingClientRect();
    let mainRect = document.querySelector('.r-main')['getBoundingClientRect']();
    let selfOffsetTop = selfRect.top - mainRect.top;
    let selfMaxHeight = document.querySelector('.r-main')['offsetHeight'] - selfOffsetTop;
    this.contentHeight = Math.min(this.height + this.offsetHeight, selfMaxHeight + this.offsetHeight);
    this.contentHeight = Math.min(this.contentHeight, selfMaxHeight);
    this.changeDetector.detectChanges();
  }

  scrollTop(event?: any) {
    this.content.nativeElement.scrollTo(0, 0);
  }

  scrollUp(event?: any) {
    this.content.nativeElement.scrollTo(0, this.content.nativeElement.scrollTop - this.content.nativeElement.offsetHeight/3);
  }

  scrollDown(event?: any) {
    this.content.nativeElement.scrollTo(0, this.content.nativeElement.scrollTop + this.content.nativeElement.offsetHeight/3);
  }

}
