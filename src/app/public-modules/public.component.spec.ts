import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicModulesComponent } from './public.component';

describe('PublicModulesComponent', () => {
  let component: PublicModulesComponent;
  let fixture: ComponentFixture<PublicModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
