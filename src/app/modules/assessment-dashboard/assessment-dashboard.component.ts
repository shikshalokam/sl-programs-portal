import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../private-modules/auth-service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrls: ['./assessment-dashboard.component.scss']
})
export class AssessmentDashboardComponent implements OnInit {
  programId;
  assessmentId;
  // links ;
  opened = true;
  pushMode = 'side';
  currentUser;
  logo =" ./assets/shikshalokam.png";
  baseUrl;
  portalName;

  constructor(private route : ActivatedRoute,private authService :AuthService) {
    if (window.screen.width < 760) { // 768px portrait
      this.opened = false;
      this.pushMode = 'push';
    }

    this.currentUser = this.authService.getCurrentUserDetails();
    this.baseUrl = environment.base_url;
    this.portalName = environment. portal_name;
   }



  ngOnInit() {


  }
   
  onLogout(){
    this.authService.getLogout();
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
  links = [  
        { 
          linkHeading : "headings.features",
          options:[
            
            {
              value :"headings.reports",
                anchorLink:"report",
                id:'report',
            },
            {
              value:"headings.operations",
              anchorLink:"operations",
              id:'operations'
            }
          ]
          }
      ] ;
}
