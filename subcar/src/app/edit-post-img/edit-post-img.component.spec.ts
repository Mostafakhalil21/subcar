import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostImgComponent } from './edit-post-img.component';

describe('EditPostImgComponent', () => {
  let component: EditPostImgComponent;
  let fixture: ComponentFixture<EditPostImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
