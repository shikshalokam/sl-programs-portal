import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideReportComponent } from './inside-report.component';

describe('InsideReportComponent', () => {
  let component: InsideReportComponent;
  let fixture: ComponentFixture<InsideReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
