import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramMetaDataComponent } from './add-program-meta-data.component';

describe('AddProgramMetaDataComponent', () => {
  let component: AddProgramMetaDataComponent;
  let fixture: ComponentFixture<AddProgramMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramMetaDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
