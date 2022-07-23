import { TestBed } from '@angular/core/testing';

import { HostAuthService } from './host-auth.service';

describe('HostAuthService', () => {
  let service: HostAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
