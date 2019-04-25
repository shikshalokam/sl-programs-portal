import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSolutionComponent } from './select-solution.component';

describe('SelectSolutionComponent', () => {
  let component: SelectSolutionComponent;
  let fixture: ComponentFixture<SelectSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
