import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from 'src/app/global-config';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SelectProgramComponent } from './select-program/select-program.component';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {
   headings= 'headings.reportDashboards'
   operation;

   dashboards;
  canAcess = localStorage.getItem('canAcess');
  constructor(private router :Router,private dialog :MatDialog) { 
     this.dashboards = GlobalConfig.ReportDashBoardLinks;
     console.log(this.dashboards)
  }

 

  ngOnInit() {
  }

  navigateLink(event){

    this.openProgramDialogBox(event);
    // this.router.navigate([event]);

  }
  
  openProgramDialogBox(event): void {
    const dialogRef = this.dialog.open(SelectProgramComponent, {
      width: '600px',
      height:'420px',
      data : {event},
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
