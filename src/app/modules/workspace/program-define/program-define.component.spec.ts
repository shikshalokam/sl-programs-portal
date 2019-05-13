import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDefineComponent } from './program-define.component';

describe('ProgramDefineComponent', () => {
  let component: ProgramDefineComponent;
  let fixture: ComponentFixture<ProgramDefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
