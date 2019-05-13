import { Component, OnInit } from '@angular/core';
import { GlobalConfig } from '../../global-config';
import { MatDialog } from '@angular/material';
import { AddProgramMetaDataComponent } from '../add-program-meta-data/add-program-meta-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss']
})
export class WorkspaceDashboardComponent implements OnInit {
  headings="headings.workSpace";
  dashboards: { tooltip: string; anchorLink: string; id: string; icon: string; disabled: boolean; }[];
  constructor(private dialog :MatDialog,
    private router : Router

  ) { }

  ngOnInit() {
    this.dashboards = GlobalConfig.workSpaceDashBoardLinks;
  }

  navigateLink(event){
    console.log(event)
    this.router.navigate([event]);

    // if(event == 'add-program'){
    //   this.openProgramMetaDataBox();
    // }
  }
  openProgramMetaDataBox(){
    // this.router.navigate['/workspace/program-define'];

    // const dialogRef = this.dialog.open(AddProgramMetaDataComponent, {
    //   width: '90%',
    //   height:'90%',
    //   // data : {event},
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(result)
    //   // this.router.navigate['/workspace/add-program'];
    // });
  }
}
