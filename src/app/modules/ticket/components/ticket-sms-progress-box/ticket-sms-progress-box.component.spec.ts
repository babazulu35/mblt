import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSmsProgressBoxComponent } from './ticket-sms-progress-box.component';

describe('TicketSmsProgressBoxComponent', () => {
  let component: TicketSmsProgressBoxComponent;
  let fixture: ComponentFixture<TicketSmsProgressBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSmsProgressBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSmsProgressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
