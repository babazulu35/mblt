import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxofficeProductItemComponent } from './boxoffice-product-item.component';

describe('BoxofficeProductItemComponent', () => {
  let component: BoxofficeProductItemComponent;
  let fixture: ComponentFixture<BoxofficeProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxofficeProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxofficeProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
