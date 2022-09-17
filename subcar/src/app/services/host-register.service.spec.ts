import { TestBed } from '@angular/core/testing';

import { HostRegisterService } from './host-register.service';

describe('HostRegisterService', () => {
  let service: HostRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
