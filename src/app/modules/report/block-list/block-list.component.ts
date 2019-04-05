import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit {
  object = Object;
  expandedElement;
  blocks;
  dataSource;
  blockList;
  schoolList;
  programId;
  blockId;
  error: any;
  selection;
  arr = [];
  enableMultiSchool: boolean = false;
  blockListDataSource;



  selectedZoneIndex = -1;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  snackBar: any;
  data: any;
  headings:string = "headings.blockListHeading"

  constructor(private bottomSheet: MatBottomSheet, private route: ActivatedRoute, private reportService: ReportService, private utility: UtilityService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
    });
  }

  ngOnInit() {
    this.getAllBlocks();
  }


  getAllBlocks() {
    this.utility.loaderShow();
    this.reportService.getListOfBlock(this.programId)
      .subscribe(data => {
        this.blockList = data['result']['zones'];
        this.blockListDataSource = data['result']['zones']
        this.utility.loaderHide()
      },
        (error) => {
          this.error = error;
          // this.snackBar.open(GlobalConfig.errorMessage, "OK", { duration: 9000 })
          this.utility.loaderHide();
          ;
        }
      );
  }

  

  getSchoolList(id) {
    // this.utility.loaderShow();
    this.dataSource = new MatTableDataSource();
    this.reportService.getListOfSchool(this.programId, id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data['result']['schools']);
        this.paginator.pageSize = 5;
        this.paginator.pageIndex = 0;
        this.paginator.length = data['result']['schools'].length;
        console.log(this.paginator)
        this.dataSource.paginator = this.paginator;
        this.selection = new SelectionModel(true, []);
      },
        (error) => {
          this.error = error;
          // this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
          this.utility.loaderHide();
          ;
        }
      );

  }

}






