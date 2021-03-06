import { Component, OnInit, ViewChild } from '@angular/core';
import { TransitionCheckState, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { OperationsService } from '../operations-service/operations.service';
import { GlobalConfig } from 'src/app/modules/global-config';

@Component({
  selector: 'app-view-assessors',
  templateUrl: './view-assessors.component.html',
  styleUrls: ['./view-assessors.component.scss']
})
export class ViewAssessorsComponent implements OnInit {
  displayedColumns: string[] = ['externalId', 'role', '_id'];
  headings = 'headings.assessorListHeading';
  smallScreen = false;
  search = '';
  searchValue = '';
  programId;
  assessmentId;
  assessorList;
  result;
  length: number;
  dataSource;
  error: any;
  pageIndex: number = 0;
  pageSize: number = 20;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private operationsService: OperationsService,
    private snackBar: MatSnackBar,
    private utility: UtilityService,
  ) {
    this.programId = JSON.parse(localStorage.getItem('currentProgram'))['_id'];
    this.assessmentId = JSON.parse(localStorage.getItem('currentAssessments'))['_id'];
    this.getAssessorlist()
  }

  getAssessorlist() {
    this.utility.loaderShow();
    this.operationsService.getAssessors(this.programId, this.assessmentId, this.search, this.pageIndex, this.pageSize)
      .subscribe(data => {
        this.assessorList = data['result']['assessorInformation'];
        this.result = data['result']['assessorInformation'].length;
        this.length = data['result']['totalCount'];
        this.dataSource = new MatTableDataSource(data['result']['assessorInformation']);
        setTimeout(() => this.dataSource.sort = this.sort);
        this.utility.loaderHide()
      },
        (error) => {
          this.error = error;
          this.utility.loaderHide();
        }
      );
  }

  applyFilter(filterValue: string) {
    this.searchValue = filterValue;
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }
  ngOnInit() {
    this.utility.loaderShow();
  }
  onResize(event) {
    if (event.target.innerWidth < 760) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  pageEvent(event) {

    if (this.pageSize !== event.pageSize ? this.pageSize : event.pageSize)
      this.pageIndex = event.pageIndex;
    this.getAssessorlist();
  }

  searchInApi(event) {
    this.search = event;
    this.pageIndex = 0;
    this.getAssessorlist();
  }

}
