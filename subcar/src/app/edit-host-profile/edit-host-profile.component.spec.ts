import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHostProfileComponent } from './edit-host-profile.component';

describe('EditHostProfileComponent', () => {
  let component: EditHostProfileComponent;
  let fixture: ComponentFixture<EditHostProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHostProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHostProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
