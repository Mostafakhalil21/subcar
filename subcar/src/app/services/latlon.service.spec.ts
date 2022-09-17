import { TestBed } from '@angular/core/testing';

import { LatlonService } from './latlon.service';

describe('LatlonService', () => {
  let service: LatlonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatlonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
