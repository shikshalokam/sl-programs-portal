import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsReportComponent } from './ops-report.component';

describe('OpsReportComponent', () => {
  let component: OpsReportComponent;
  let fixture: ComponentFixture<OpsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
