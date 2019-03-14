import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'shikshalokam';;
import { MatSnackBar } from '@angular/material';
import { ProgramsDashboardService } from './programs-dashboard-service/programs-dashboard.service';
import { AuthService } from '../private-modules/auth-service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-programs-dashboard',
  templateUrl: './programs-dashboard.component.html',
  styleUrls: ['./programs-dashboard.component.scss']
})
export class ProgramsDashboardComponent implements OnInit {
  isLoggedIn:boolean;
  programData;
  currentAssesssment: any;
  currentAssessmentId;
  currentProgramId;
  currentProgram;
  opened = true;
  pushMode = 'side';
  currentUser;
  logo =" ./assets/shikshalokam.png";
  baseUrl;
  portalName;


  constructor(private utilityService :UtilityService,private snackBar :MatSnackBar,private programService: ProgramsDashboardService,private router :Router , private authService  :AuthService) {
    if (window.screen.width < 760) { // 768px portrait
      this.opened = false;
      this.pushMode = 'push';
    }
    this.currentUser = this.authService.getCurrentUserDetails();

    if(this.currentUser){
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }

    this.baseUrl = environment.base_url;
    this.portalName = environment.portal_name;

  }

  onLogout(){
    this.authService.getLogout();
  }
  ngOnInit() {
    this.utilityService.loaderShow();
    this.programService.getProgramList()
      .subscribe(data => {
        this.programData = data['result'];
        
        this.utilityService.loaderHide();
      }, error => {
      this.utilityService.loaderHide();
      this.snackBar.open(error['message'], "Ok", {duration: 9000});
      })
  }
  onResize(event)
  {
    if(event.target.innerWidth < 760)
    {
      this.opened = false;
      this.pushMode = 'push';
    }
    else{
      this.opened = true;
      this.pushMode = 'side';

    }
  }

  // setCurrentAssessment(assessment) {
  //   this.currentProgram = assessment;
  //   this.currentProgramId= assessment._id;
  //   this.currentProgram =assessment;
  //   this.currentAssesssment = assessment.assessments;
  // }
  // programClick(assessment){
  //   this.currentAssessmentId=assessment._id;
  //   localStorage.setItem('currentProgram',JSON.stringify(this.currentProgram));
  //   localStorage.setItem('currentAssessments',JSON.stringify(assessment));
   

  //   // this.router.navigate(['/assessments']);
  // }
}
