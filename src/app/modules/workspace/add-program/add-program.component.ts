import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ProgramActionSheetComponent } from './action-sheet/program-action-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { newProgram } from '../add-program-meta-data/programApi';
import { FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {
  opened = true;
  programsForm: any;
  programData;
  group;
  showProgram: boolean = false;
  constructor( 
    private bottomSheet :MatBottomSheet,
    private route : ActivatedRoute,
    private router :Router,
    private _formBuilder : FormBuilder
  
    ) { }

    ngOnInit() {
      this.programData = newProgram;
      this.group = this._formBuilder.group({});
      this.createForm(this.programData);
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
          field.value.forEach(level => {
            control.push(this._formBuilder.group({
              [controlLabel]: [level ? level : '', Validators.required]
            })
            )
          })
  
        }
        else {
          control = new FormControl(field.value ? field.value : "", field.validation.required? Validators.required :null);  }
        this.group.addControl(field.field, control);
      });
  
      return this.group;
    }
  
    customizeForm(control) {
      let controls = control.controlName ;
      if (control.mode == 'add') {
        this.programsForm.controls[control.controlName].push(
          this._formBuilder.group({ [controls]: ['', Validators.required] }) );
      }
      else if (control.mode == 'delete') {
        this.programsForm.controls[controls].removeAt(control.index);
      }
    }
  
  openBottomSheet(){
    this.bottomSheet.open(ProgramActionSheetComponent);
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe( data =>{
      console.log(data)
      if(data){
        this.showProgram = true;
      }
    })
  }
}
