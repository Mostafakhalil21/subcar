import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreprofiledetailsComponent } from './moreprofiledetails.component';

describe('MoreprofiledetailsComponent', () => {
  let component: MoreprofiledetailsComponent;
  let fixture: ComponentFixture<MoreprofiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreprofiledetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreprofiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
