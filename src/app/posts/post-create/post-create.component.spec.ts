import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreatComponent } from './post-create.component';

describe('PostCreatComponent', () => {
  let component: PostCreatComponent;
  let fixture: ComponentFixture<PostCreatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCreatComponent],
    });
    fixture = TestBed.createComponent(PostCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
