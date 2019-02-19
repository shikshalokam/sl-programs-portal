import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessorsComponent } from './view-assessors.component';

describe('ViewAssessorsComponent', () => {
  let component: ViewAssessorsComponent;
  let fixture: ComponentFixture<ViewAssessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
