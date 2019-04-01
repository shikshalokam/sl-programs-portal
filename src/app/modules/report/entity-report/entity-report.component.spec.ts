import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityReportComponent } from './entity-report.component';

describe('EntityReportComponent', () => {
  let component: EntityReportComponent;
  let fixture: ComponentFixture<EntityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
