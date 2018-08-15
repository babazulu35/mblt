import { TestBed, inject } from '@angular/core/testing';

import { EventSearchService } from './event-search.service';

describe('EventSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventSearchService]
    });
  });

  it('should be created', inject([EventSearchService], (service: EventSearchService) => {
    expect(service).toBeTruthy();
  }));
});
