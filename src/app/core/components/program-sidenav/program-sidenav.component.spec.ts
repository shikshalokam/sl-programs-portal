import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSidenavComponent } from './program-sidenav.component';

describe('ProgramSidenavComponent', () => {
  let component: ProgramSidenavComponent;
  let fixture: ComponentFixture<ProgramSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
