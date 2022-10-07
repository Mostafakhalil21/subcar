import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostFooterComponent } from './host-footer.component';

describe('HostFooterComponent', () => {
  let component: HostFooterComponent;
  let fixture: ComponentFixture<HostFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
