import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBlocksComponent } from './dashboard-blocks.component';

describe('DashboardBlocksComponent', () => {
  let component: DashboardBlocksComponent;
  let fixture: ComponentFixture<DashboardBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
