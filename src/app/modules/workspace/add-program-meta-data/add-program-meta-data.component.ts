import { Component, OnInit, Inject } from '@angular/core';
import { newProgram } from './programApi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectProgramComponent } from '../../operations/operations-dashboard/select-program/select-program.component';
import { UtilityService } from 'shikshalokam';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-program-meta-data',
  templateUrl: './add-program-meta-data.component.html',
  styleUrls: ['./add-program-meta-data.component.scss']
})
export class AddProgramMetaDataComponent implements OnInit {

  programMetaData;
  headings = "headings.addProgram"
  programsForm;
  group;

  constructor(private router: Router, public dialogRef: MatDialogRef<AddProgramMetaDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder, private utilityService: UtilityService) { }

  ngOnInit() {
    this.programMetaData = newProgram;
    this.createForm(this.programMetaData);
  }

  onChoose() {
    this.dialogRef.close(true);
  }
  createForm(objectArray) {
    this.programsForm = this.utilityService.createControl(objectArray)

  }
  onSubmit() {
    let rawValue = this.programsForm.getRawValue();
    this.router.navigate(['/workspace/add-program']);
    this.onChoose();
  }
}
