import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramActionSheetComponent } from './program-action-sheet.component';

describe('ActionSheetComponent', () => {
  let component: ProgramActionSheetComponent;
  let fixture: ComponentFixture<ProgramActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
