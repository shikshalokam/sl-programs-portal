import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleEntityDrilldownReportComponent } from './multiple-entity-drilldown-report.component';

describe('MultipleEntityDrilldownReportComponent', () => {
  let component: MultipleEntityDrilldownReportComponent;
  let fixture: ComponentFixture<MultipleEntityDrilldownReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleEntityDrilldownReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleEntityDrilldownReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
