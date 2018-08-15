import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSessionBoxComponent } from './event-session-box.component';

describe('EventSessionBoxComponent', () => {
  let component: EventSessionBoxComponent;
  let fixture: ComponentFixture<EventSessionBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSessionBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSessionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
