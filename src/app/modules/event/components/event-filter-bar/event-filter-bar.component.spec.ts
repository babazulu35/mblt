import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterBarComponent } from './event-filter-bar.component';

describe('EventFilterBarComponent', () => {
  let component: EventFilterBarComponent;
  let fixture: ComponentFixture<EventFilterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFilterBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
