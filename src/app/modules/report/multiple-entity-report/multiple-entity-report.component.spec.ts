import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleEntityRportComponent } from './multiple-entity-report.component';

describe('MultipleEntityRportComponent', () => {
  let component: MultipleEntityRportComponent;
  let fixture: ComponentFixture<MultipleEntityRportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleEntityRportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleEntityRportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
