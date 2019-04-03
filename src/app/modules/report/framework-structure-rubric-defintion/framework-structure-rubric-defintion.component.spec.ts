import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameworkStructureRubricDefintionComponent } from './framework-structure-rubric-defintion.component';

describe('FrameworkStructureRubricDefintionComponent', () => {
  let component: FrameworkStructureRubricDefintionComponent;
  let fixture: ComponentFixture<FrameworkStructureRubricDefintionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrameworkStructureRubricDefintionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameworkStructureRubricDefintionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
