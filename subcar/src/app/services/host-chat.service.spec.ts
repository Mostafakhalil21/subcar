import { TestBed } from '@angular/core/testing';

import { HostChatService } from './host-chat.service';

describe('HostChatService', () => {
  let service: HostChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
