import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrintOptionsComponent } from './ticket-print-options.component';

describe('TicketPrintOptionsComponent', () => {
  let component: TicketPrintOptionsComponent;
  let fixture: ComponentFixture<TicketPrintOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPrintOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPrintOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
