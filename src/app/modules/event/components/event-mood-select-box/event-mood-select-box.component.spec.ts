import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMoodSelectBoxComponent } from './event-mood-select-box.component';

describe('EventMoodSelectBoxComponent', () => {
  let component: EventMoodSelectBoxComponent;
  let fixture: ComponentFixture<EventMoodSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMoodSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMoodSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
