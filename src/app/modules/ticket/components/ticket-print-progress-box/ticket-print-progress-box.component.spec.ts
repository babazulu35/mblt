import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrintProgressBoxComponent } from './ticket-print-progress-box.component';

describe('TicketPrintProgressBoxComponent', () => {
  let component: TicketPrintProgressBoxComponent;
  let fixture: ComponentFixture<TicketPrintProgressBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPrintProgressBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPrintProgressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
