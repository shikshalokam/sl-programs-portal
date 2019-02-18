import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsDashboardService } from 'src/app/core/services/programs-dashboard-service/programs-dashboard.service';
import { UtilityService } from 'src/app/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-programs-dashboard',
  templateUrl: './programs-dashboard.component.html',
  styleUrls: ['./programs-dashboard.component.scss']
})
export class ProgramsDashboardComponent implements OnInit {

  programData;
  currentAssesssment: any;
  currentAssessmentId;
  currentProgramId;
  currentProgram;

  constructor(private utilityService :UtilityService,private snackBar :MatSnackBar,private programService: ProgramsDashboardService,private router :Router) {
  }


  ngOnInit() {
    this.utilityService.loaderShow();
    this.programService.getProgramList()
      .subscribe(data => {
        this.programData = data['result'];
        this.setCurrentAssessment(this.programData[0]);
        this.utilityService.loaderHide();
      }, error => {
      this.utilityService.loaderHide();
      this.snackBar.open(error['message'], "Ok", {duration: 9000});
      })
  }

  setCurrentAssessment(assessment) {
    this.currentProgram = assessment;
    this.currentProgramId= assessment._id;
    this.currentProgram =assessment;
    this.currentAssesssment = assessment.assessments;
  }
  programClick(assessment){
    this.currentAssessmentId=assessment._id;
    localStorage.setItem('currentProgram',JSON.stringify(this.currentProgram));
    localStorage.setItem('currentAssessments',JSON.stringify(assessment));
    this.router.navigate(['/assessments']);
  }
}
