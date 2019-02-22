import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private route : ActivatedRoute) {
    if (window.screen.width < 760) { // 768px portrait
      this.opened = false;
      this.pushMode = 'push';
    }
   

   
      // this.programId = localStorage.getItem('programId')
      // this.route.queryParams.subscribe(params => {
      //   this.programId= params['programId'];
      //   this.assessmentId = params['assessmentId']
      //   this.links = [  
      //     { 
      //       linkHeading : "headings.features",
      //       options:[
              
      //         {
      //           value :"headings.reports",
      //           link :{
      //             programId:this.programId,
      //             assessmentId :this.assessmentId,
      //             anchorLink:"report"
      //           }
      //         },
      //                       {
      //           value:"headings.operations",
      //           link :{
      //             programId:this.programId,
      //             assessmentId :this.assessmentId,
      //           anchorLink:"operations"
      //           }
      //         }
      //       ]
      //       }
      //   ] ;
      // })
    
   }

  ngOnInit() {

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
                anchorLink:"report"
            },
                          {
              value:"headings.operations",
             
              anchorLink:"operations"
            }
          ]
          }
      ] ;
}
