import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxofficePurchaseComponent } from './boxoffice-purchase.component';

describe('BoxofficePurchaseComponent', () => {
  let component: BoxofficePurchaseComponent;
  let fixture: ComponentFixture<BoxofficePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxofficePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxofficePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
