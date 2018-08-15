import { TestBed, inject } from '@angular/core/testing';

import { BackstageAuthenticationService } from './backstage-authentication.service';

describe('BackstageAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackstageAuthenticationService]
    });
  });

  it('should be created', inject([BackstageAuthenticationService], (service: BackstageAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
