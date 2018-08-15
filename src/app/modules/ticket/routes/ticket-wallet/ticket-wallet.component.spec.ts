import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketWalletComponent } from './ticket-wallet.component';

describe('TicketWalletComponent', () => {
  let component: TicketWalletComponent;
  let fixture: ComponentFixture<TicketWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
