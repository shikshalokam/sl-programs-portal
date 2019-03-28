import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute } from '@angular/router';


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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  router: any;
  
  constructor(private route: ActivatedRoute ,private reportService: ReportService,private utility: UtilityService) { 
    this.programId = JSON.parse( localStorage.getItem('currentProgram'))['externalId'];
    this.blockId;
    // this.route.params.subscribe(params => {
    //   console.log(params, "params");
    //   this.programId = params["Id"];
    // });



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


  showConfig(){
    this.reportService.getListOfBlock(this.programId)
    .subscribe(data => {
      console.log(data, "data");
      // this.result = data['result']['zones']['length'];
      // console.log(this.result,"result");
      // this.dataSource = new MatTableDataSource(data['result']['zones']);
      // console.log(this.dataSource, "data source in school list")
      // setTimeout(() => this.dataSource.sort = this.sort);

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

  // programClick(currentProgram){
  //   console.log("clicked");
  //   this.router.navigate({ queryParams: {ProgramId: currentProgram.externalId} })
  // }
  

}
