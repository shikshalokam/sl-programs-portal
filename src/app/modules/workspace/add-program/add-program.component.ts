import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ProgramActionSheetComponent } from './action-sheet/program-action-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { newProgram } from '../add-program-meta-data/programApi';
import { FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';
import { UtilityService, ApiService } from 'shikshalokam';

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
  showPrograms: boolean = true;
  showSolution: boolean = false;
  headings: "headings.addProgram";
  solutionList;
  currentSolution;
  solutionForm;
  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.programData = newProgram;
    this.apiService.get('/assets/solutionList.json').subscribe(solutionList => {
      // console.log(solutionList);
      this.solutionList = solutionList['components'];
    })
    this.group = this._formBuilder.group({});
    this.createForm(this.programData);
  }


  createForm(objectArray) {
    this.programsForm = this.utilityService.createControl(objectArray);

  }
  selectSolution() {
    this.router.navigate(['/workspace/select-solution'])
  }
  openBottomSheet() {
    this.bottomSheet.open(ProgramActionSheetComponent);
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(data => {
      console.log(data)
      if (data) {
        this.showPrograms = true;
      }
    })
  }
  showSolutions(solution) {
    this.currentSolution = solution;
    this.solutionForm = this.utilityService.createControl(this.currentSolution['form']);
    // console.log(this.solutionForm)
  }
}
