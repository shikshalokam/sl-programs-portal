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
  
  constructor(private router  : Router , public dialogRef: MatDialogRef<AddProgramMetaDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder, private utilityService: UtilityService) { }

  ngOnInit() {
    this.programMetaData = newProgram;
    // console.log(this.programMetaData)
    this.group = this._formBuilder.group({});
    this.createForm(this.programMetaData);
  }

  onChoose() {
    this.dialogRef.close(true);
  }
  createForm(objectArray) {
    this.programsForm = this.createControl(objectArray);
    
  }

  

  createControl(field) {
    let control;
    field.forEach(field => {
      let controlLabel = field.field;
      if (field.input === "array") {
        control = new FormArray([])
        // this.questionCount = this.data.questionObject.question.length;
        field.value.forEach(level => {
          // control.push( new FormControl(level)
          control.push(this._formBuilder.group({
            [controlLabel]: [level ? level : '', Validators.required]
          })
          )
        })

      }
      else {
        // control = this._formBuilder.control({
        //   [controlLabel]:[field.value , Validators.required]});
        control = new FormControl(field.value ? field.value : "", field.validation.required? Validators.required :null
          // this.bindValidations(field.validation || [])
        );
      }
      this.group.addControl(field.field, control);
    });

    return this.group;
  }

  customizeForm(control) {
    // console.log(control)
    let controls = control.controlName ;

    if (control.mode == 'add') {
      this.programsForm.controls[control.controlName].push(
        this._formBuilder.group({
          [controls]: ['', Validators.required]
        })
      );
    }
    else if (control.mode == 'delete') {
      // console.log(this.programsForm.controls[controls])
      this.programsForm.controls[controls].removeAt(
        // this._formBuilder.control({
        //   keyWords: ['', Validators.required]
        // })
        control.index
        );
    }
  //   else {
  //     // this.programsForm.controls[controls].controls=[];
  //     let control;
  //     this.programMetaData.forEach(field => {
  //       if (field.field === controls) {
  //       let controlLabel = field.field;

  //         control = new FormArray([])
  //         // this.questionCount = this.data.questionObject.question.length;
  //         field.value.forEach(level => {
  //           // control.push( new FormControl(level)
  //           control.push(this._formBuilder.control({
  //             [controlLabel]: [level ? level : '', Validators.required]
  //           })
  //           )
  //         })
  
  //       }
  //     });
  //     this.programsForm.controls[controls]=control; 
      
  //   console.log(this.programsForm)
  // }
}
onSubmit(){
  let rawValue = this.programsForm.getRawValue();
  this.router.navigate(['/workspace/add-program'] );
  this.onChoose();
  // this.router.navigate['/home'];
}
}
