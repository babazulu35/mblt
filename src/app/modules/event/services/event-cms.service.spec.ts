import { TestBed, inject } from '@angular/core/testing';

import { EventCmsService } from './event-cms.service';

describe('EventCmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventCmsService]
    });
  });

  it('should be created', inject([EventCmsService], (service: EventCmsService) => {
    expect(service).toBeTruthy();
  }));
});
