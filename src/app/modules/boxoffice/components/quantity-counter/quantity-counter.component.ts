import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss']
})
export class QuantityCounterComponent implements OnInit {

  constructor() { }

  @Input() count: number = 0;
  @Input() maxCount:number;
  @Output() changeEvent: EventEmitter<{count:number}> = new EventEmitter();

  @HostBinding('class.c-quantity-counter') readonly cClass: boolean = true;
  @HostBinding('class.c-quantity-counter--disabled') @Input() isDisabled: boolean;

  ngOnInit() {
  }

  incrementCount(){
    if(this.isDisabled){ return }
    if(this.count == this.maxCount) {
      this.count = this.maxCount;
      this.changeEvent.emit({
        count: this.count
      })
    }
    else {
    this.count++;
    this.changeEvent.emit({
      count: this.count
    })
  }
  }

  decrementCount(){
    if(this.isDisabled || this.count == 0){ return }
    this.count--;
    this.changeEvent.emit({
      count: this.count
    })
  }

}
