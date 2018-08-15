import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketCardComponent } from './event-ticket-card.component';

describe('EventTicketCardComponent', () => {
  let component: EventTicketCardComponent;
  let fixture: ComponentFixture<EventTicketCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTicketCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
