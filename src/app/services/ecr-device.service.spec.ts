import { TestBed, inject } from '@angular/core/testing';

import { EcrDeviceService } from './ecr-device.service';

describe('EcrDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EcrDeviceService]
    });
  });

  it('should be created', inject([EcrDeviceService], (service: EcrDeviceService) => {
    expect(service).toBeTruthy();
  }));
});
