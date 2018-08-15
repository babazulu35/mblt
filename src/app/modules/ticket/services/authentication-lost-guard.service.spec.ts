import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationLostGuardService } from './authentication-lost-guard.service';

describe('AuthenticationLostGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationLostGuardService]
    });
  });

  it('should be created', inject([AuthenticationLostGuardService], (service: AuthenticationLostGuardService) => {
    expect(service).toBeTruthy();
  }));
});
