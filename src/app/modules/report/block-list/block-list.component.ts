import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from 'src/app/global-config';


@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  displayedColumns: string[]= ['externalId','name','city'];
  blocks;
  result;
  dataSource;
  blockList;
  schoolList;
  smallScreen = false;
  programId;
  blockId;
  error: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  router: any;
  snackBar: any;

  constructor(private route: ActivatedRoute ,private reportService: ReportService,private utility: UtilityService) { 
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
    });
    this.showConfig();
    this.blockClick(this.blockId);
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


  showConfig(){
    this.reportService.getListOfBlock(this.programId)
    .subscribe(data => {
      console.log(data, "data");
      this.result = data['result']['zones']['length'];
      console.log(this.result,"result");
      this.dataSource = new MatTableDataSource(data['result']['zones']);
      console.log(this.dataSource, "data source in school list")
      setTimeout(() => this.dataSource.sort = this.sort);
      this.blockList = data['result']['zones'];
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
        this.utility.loaderHide();
        ;
      }
    );
  }

  showSchool(){
    this.reportService.getListOfSchool(this.programId, this.blockId)
    .subscribe(data => {
      this.result = data['result']['schools']['length'];
      this.dataSource = new MatTableDataSource(data['result']['schools']);
      setTimeout(() => this.dataSource.sort = this.sort);
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
        this.utility.loaderHide();
        ;
      }
    );

  }

  blockClick(id){
    this.blockId = id;
    this.showSchool();
  }
  

}

