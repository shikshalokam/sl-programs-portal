import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
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
  links = {};
  apidata;
  blockData;
  searchVal;

  selectedZoneIndex = -1;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  snackBar: any;
  data: any;
  headings:string = "headings.blockListHeading"

  constructor(private bottomSheet: MatBottomSheet, private route: ActivatedRoute, private reportService: ReportService, private utility: UtilityService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];

      this.links = {
        multiEntity: [
          {
            label: "Drilldown Report",
            link: "/report/multiple-entity-drilldown-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              school: "",
              blockName:""
            }
          },
          {
            label: "Highlevel Report",
            link: "/report/multiple-entity-report",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              school: "",
              blockName:""
            }
          }
        ],
        singleEntity: [
          {
            label: "Drilldown Report",
            link: "/report/entity-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              // school:""
            }
          },
          {
            label: "Highlevel Report",
            link: "/report/highlevel-entity-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              // school:""
            }
          }
        ]
      };
    });
  }

  ngOnInit() {
    this.getAllBlocks();
  }

  applyFilter(filterValue: string) {
    this.searchVal = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getAllBlocks() {
    this.utility.loaderShow();
    this.reportService.getListOfBlock(this.programId)
      .subscribe(data => {
        // this.blockData = data;
        this.blockList = data['result']['zones'];
        this.blockListDataSource = data['result']['zones']
        this.blockData = this.blockListDataSource;
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
        this.apidata = data;
        this.dataSource = new MatTableDataSource(this.apidata['result']['schools']);
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






