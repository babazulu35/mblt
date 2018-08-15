import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-filter-bar',
  templateUrl: './event-filter-bar.component.html',
  styleUrls: ['./event-filter-bar.component.scss']
})
export class EventFilterBarComponent implements OnInit {

  @HostBinding('class.c-list-filter-bar') readonly cClass: boolean = true;

  constructor() { }

  @Input() listItems:{isSelected: Boolean, title: String, value: String}[];

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  checkItem(clickedItem){

    this.uncheckItems();

    this.listItems.forEach(item => {
      if(item === clickedItem) item.isSelected = true;
    });

    this.clickEvent.emit(clickedItem.value);

  }

  uncheckItems(){
    this.listItems.forEach(item => {
      item.isSelected = false;
    });
  }

}
