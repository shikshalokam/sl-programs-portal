import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations-dashboard',
  templateUrl: './operations-dashboard.component.html',
  styleUrls: ['./operations-dashboard.component.scss']
})
export class OperationsDashboardComponent implements OnInit {
   headings= 'headings.dashboards'
   operation;

   dashboards;

  constructor() { 
      this.dashboards=[
        {
          icons:"done",
          tooltip:"headings.operationDashboardUpload",
          anchorLink:"/assessments/operations/upload-csv"
        },
        {
          icons:"done",
          tooltip:"headings.schoolListHeading",
          anchorLink: "/assessments/operations/view-schools"
        },
        {
          icons:"done",
          tooltip:"headings.assessorListHeading",
          anchorLink: "/assessments/operations/view-assessors"
        }
      ]
  }

 

  ngOnInit() {
  }

  
}
