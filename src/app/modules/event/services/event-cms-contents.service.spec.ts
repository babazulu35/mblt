import { TestBed, inject } from '@angular/core/testing';

import { EventCmsContentsService } from './event-cms-contents.service';

describe('EventCmsContentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventCmsContentsService]
    });
  });

  it('should be created', inject([EventCmsContentsService], (service: EventCmsContentsService) => {
    expect(service).toBeTruthy();
  }));
});
