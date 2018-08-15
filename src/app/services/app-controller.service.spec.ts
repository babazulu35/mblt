import { TestBed, inject } from '@angular/core/testing';

import { AppControllerService } from './app-controller.service';

describe('AppControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppControllerService]
    });
  });

  it('should be created', inject([AppControllerService], (service: AppControllerService) => {
    expect(service).toBeTruthy();
  }));
});
