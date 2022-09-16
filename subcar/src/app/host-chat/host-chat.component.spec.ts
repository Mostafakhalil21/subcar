import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostChatComponent } from './host-chat.component';

describe('HostChatComponent', () => {
  let component: HostChatComponent;
  let fixture: ComponentFixture<HostChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
