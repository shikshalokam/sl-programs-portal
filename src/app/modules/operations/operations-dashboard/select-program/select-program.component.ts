import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogData } from 'src/app/modules/report/ecm-report/ecm-report.component';
import { UtilityService } from 'shikshalokam';
import { ProgramsDashboardService } from 'src/app/modules/programs-dashboard/programs-dashboard-service/programs-dashboard.service';
import { Router } from '@angular/router';
import { GlobalConfig } from 'src/app/modules/global-config';

@Component({
  selector: 'app-select-program',
  templateUrl: './select-program.component.html',
  styleUrls: ['./select-program.component.scss']
})
export class SelectProgramComponent implements OnInit {
  programData;
  constructor( public dialogRef: MatDialogRef<SelectProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data , private utilityService:UtilityService,private programService:ProgramsDashboardService
    ,private snackBar :MatSnackBar,private router : Router) {

    }
    headings="headings.programList";
  onChoose(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    this.utilityService.loaderShow();
    this.programService.getProgramList()
      .subscribe(data => {
        this.programData = data['result'];
        this.utilityService.loaderHide();
      }, error => {
      this.utilityService.loaderHide();
      //this.snackBar.open(GlobalConfig.errorMessage, "Ok", {duration: 9000});
      })
  }
  
  programClick(currentProgram){
    localStorage.setItem('currentProgram',JSON.stringify(currentProgram));
    localStorage.setItem('currentAssessments',JSON.stringify(currentProgram.assessments[0]));
    this.router.navigate([this.data.event],{ queryParams: { solutionId: currentProgram.assessments[0]._id} })
    this.onChoose();
  }
}
