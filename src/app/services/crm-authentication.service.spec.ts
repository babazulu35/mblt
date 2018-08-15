import { TestBed, inject } from '@angular/core/testing';

import { CrmAuthenticationService } from './crm-authentication.service';

describe('CrmAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrmAuthenticationService]
    });
  });

  it('should be created', inject([CrmAuthenticationService], (service: CrmAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
