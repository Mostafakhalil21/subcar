import { TestBed } from '@angular/core/testing';

import { EditHostProfileService } from './edit-host-profile.service';

describe('EditHostProfileService', () => {
  let service: EditHostProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHostProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
