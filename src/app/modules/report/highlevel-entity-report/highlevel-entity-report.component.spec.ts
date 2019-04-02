import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlevelEntityReportComponent } from './highlevel-entity-report.component';

describe('HighlevelEntityReportComponent', () => {
  let component: HighlevelEntityReportComponent;
  let fixture: ComponentFixture<HighlevelEntityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlevelEntityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlevelEntityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
