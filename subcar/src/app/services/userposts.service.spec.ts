import { TestBed } from '@angular/core/testing';

import { UserpostsService } from './userposts.service';

describe('UserpostsService', () => {
  let service: UserpostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
