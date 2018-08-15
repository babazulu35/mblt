import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrintQrComponent } from './ticket-print-qr.component';

describe('TicketPrintQrComponent', () => {
  let component: TicketPrintQrComponent;
  let fixture: ComponentFixture<TicketPrintQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPrintQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPrintQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
