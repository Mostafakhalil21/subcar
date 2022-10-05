import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAboutComponent } from './host-about.component';

describe('HostAboutComponent', () => {
  let component: HostAboutComponent;
  let fixture: ComponentFixture<HostAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
