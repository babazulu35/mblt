import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxofficeFooterComponent } from './boxoffice-footer.component';

describe('BoxofficeFooterComponent', () => {
  let component: BoxofficeFooterComponent;
  let fixture: ComponentFixture<BoxofficeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxofficeFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxofficeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
