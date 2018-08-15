import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketWalletLoginComponent } from './ticket-wallet-login.component';

describe('TicketWalletLoginComponent', () => {
  let component: TicketWalletLoginComponent;
  let fixture: ComponentFixture<TicketWalletLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketWalletLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketWalletLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
