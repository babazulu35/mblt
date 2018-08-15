import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarBoxComponent } from './event-calendar-box.component';

describe('EventCalendarBoxComponent', () => {
  let component: EventCalendarBoxComponent;
  let fixture: ComponentFixture<EventCalendarBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
