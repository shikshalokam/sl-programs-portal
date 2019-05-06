import { Component, OnInit, Inject } from '@angular/core';
import { newProgram, imageUpload } from './programApi';
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
  buttonFunction = "meta"
  programs = [
    {
      title: "DCPCR",
      description:"Dcpcr is a  programs",
      icon: 'assignment_turned_in ',
    },
    {
      title: "MYANTRA",
      description:"Myantra is a  programs",
      icon: 'assignment_turned_in ',
    },
    {
      title: "TUNERLABS",
      description:"Tunerlabs is a  programs",
      icon: 'assignment_turned_in ',

    },
    {
      title: "Tibel",
      description:"Tibel is a  programs",
      icon: 'assignment_turned_in ',

    }
  ]
  selectedProgramTemplate: any;
  templateSelected: boolean = false;
  fileUpload: any;
  fileUploadForm: any;
  constructor(private router: Router, public dialogRef: MatDialogRef<AddProgramMetaDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder, private utilityService: UtilityService) { }

  ngOnInit() {
    this.programMetaData = newProgram;
    this.fileUpload = imageUpload;
    this.createForm(this.programMetaData);
    this.fileUploadForm = this.utilityService.uploadFile(this.fileUpload);
  }

  onChoose() {
    this.dialogRef.close(true);
  }
  createForm(objectArray) {
    this.programsForm = this.utilityService.createControl(objectArray)

  }
  onSubmit() {
    let rawValue = this.programsForm.getRawValue();
    let imageForm = this.fileUploadForm.getRawValue();
    console.log(imageForm);
    this.router.navigate(['/workspace/add-program']);
    this.onChoose();
  }
  selectProgram(program){
    this.selectedProgramTemplate = program;
  }
  programDetails(program){
    console.log(program)
    let link ='/workspace/program-details';
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });
    // this.router.navigate(['/workspace/program-details']);
    // this.onChoose();


  }

  tabIndex(tabType){
    this.buttonFunction = tabType;
  }
  onCopy(){
    this.templateSelected = true;
  }
 
}
