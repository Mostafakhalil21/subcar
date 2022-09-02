import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopUpComponent } from './post-pop-up.component';

describe('PostPopUpComponent', () => {
  let component: PostPopUpComponent;
  let fixture: ComponentFixture<PostPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
