import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProgramsDashboardService } from '../../programs-dashboard/programs-dashboard-service/programs-dashboard.service';



@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  displayedColumns: string[]= ['Id'];
  blocks;
  result;
  dataSource;
  blockList;
  schoolList;
  smallScreen = false;
  programId;
  blockId;
  error: any;
  data;

  // currentProgram= 6;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  constructor(private route: ActivatedRoute ,private reportService: ReportService,private utility: UtilityService, private router : Router, private programService:ProgramsDashboardService) { 
    this.blockId;
    this.route.queryParams.subscribe(params => {
      this.programId = params.ProgramId;
    });
    this.showConfig();
    this.showSchool();
  }

  ngOnInit() {
  }

  onResize(event){
    if(event.target.innerWidth < 760){
      this.smallScreen = true;
    }
    else{
      this.smallScreen = false;
    }
  }

  // test(currentProgram){
  //   console.log("clicked....")
  //   console.log(currentProgram, "current pgm")
  //   this.router.navigate([this.data],{ queryParams: {ProgramId: currentProgram.externalId} })
  // }


  showConfig(){
    this.reportService.getListOfBlock(this.programId)
    .subscribe(data => {
      this.blockList = data['result']['zones'];
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.utility.loaderHide();
        ;
      }
    );

  }

  showSchool(){
    this.reportService.getListOfSchool(this.programId)
    .subscribe(data => {
      console.log(data, "data2222222");
      this.result = data['result']['length'];
      this.dataSource = new MatTableDataSource(data['result']['schools']);
      setTimeout(() => this.dataSource.sort = this.sort);
      this.schoolList = data['result']['schools'];
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.utility.loaderHide();
        ;
      }
    );

  }

}
