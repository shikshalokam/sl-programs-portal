import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsDashboardComponent } from './programs-dashboard.component';

describe('ProgramsDashboardComponent', () => {
  let component: ProgramsDashboardComponent;
  let fixture: ComponentFixture<ProgramsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
