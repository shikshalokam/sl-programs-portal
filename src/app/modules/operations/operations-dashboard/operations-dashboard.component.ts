import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from 'src/app/global-config';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SelectProgramComponent } from './select-program/select-program.component';

@Component({
  selector: 'app-operations-dashboard',
  templateUrl: './operations-dashboard.component.html',
  styleUrls: ['./operations-dashboard.component.scss']
})
export class OperationsDashboardComponent implements OnInit {
   headings= 'headings.dashboards'
   operation;

   dashboards;
  canAcess = localStorage.getItem('canAcess');
  constructor(private router :Router,private dialog :MatDialog) { 
     this.dashboards = GlobalConfig.operationsDashBoardLinks;
  }

 

  ngOnInit() {
  }

  navigateLink(event){

    this.openProgramDialogBox(event);
    // this.router.navigate([event]);

  }
  
  openProgramDialogBox(event): void {
    const dialogRef = this.dialog.open(SelectProgramComponent, {
      width: '700px',
      height:'420px',
      data : {event}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
