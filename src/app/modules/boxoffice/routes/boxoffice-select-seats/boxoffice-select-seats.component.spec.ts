import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxofficeSelectSeatsComponent } from './boxoffice-select-seats.component';

describe('BoxofficeSelectSeatsComponent', () => {
  let component: BoxofficeSelectSeatsComponent;
  let fixture: ComponentFixture<BoxofficeSelectSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxofficeSelectSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxofficeSelectSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
