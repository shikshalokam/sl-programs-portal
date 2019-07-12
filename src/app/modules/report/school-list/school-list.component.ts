import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort, MatSnackBar } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { GlobalConfig } from 'src/app/modules/global-config';
import {  ActivatedRoute, Router } from '@angular/router';

elementData: {

}
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'addressLine1', 'city', 'state', 'isParentInterviewCompleted'];
  dataSource;
  schoolList;
  result;
  error: any;
  headings = 'headings.schoolListHeading';
  smallScreen = false;
  programId;
  assessmentId;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchVal: string;
  solutionId: any;

  constructor(private reportService: ReportService,
    private utility: UtilityService,
    private snackBar: MatSnackBar,
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.route.queryParams.subscribe( params => {
     this.programId = params['programId'];
     this.solutionId = params['solutionId']
          })
    this.showConfig();


  }

  onResize(event) {
    if (event.target.innerWidth < 760) {
      this.smallScreen = true;
    }
    else {
      this.smallScreen = false;
    }
  }
  showConfig() {
    let progId =  JSON.parse(localStorage.getItem('currentProgram'))._id;
    this.reportService.getSchoolList(progId,this.solutionId)
      .subscribe(data => {
        this.result = data['result'][0].solutions[0].entities.length;
        this.dataSource = new MatTableDataSource(data['result'][0].solutions[0].entities);
        setTimeout(() => this.dataSource.sort = this.sort);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.schoolList = data['result'][0].solutions[0].entities;
        this.utility.loaderHide()
        console.log(this.schoolList)
      },
        (error) => {
          this.error = error;
          //this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
          this.utility.loaderHide();
          ;
        }
      );
  }
  applyFilter(filterValue: string) {
    this.searchVal = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    ////console.logthis.dataSource)
  }
  ngOnInit() {
    this.utility.loaderShow();
    if (window.innerWidth < 760) { // 768px portrait
      this.smallScreen = true;
    }
  }
  // afterViewChecked(){
  //   if (window.screen.width < 760) { // 768px portrait
  //     this.smallScreen = true;
  // }

  objectKeys(obj) {
    return Object.keys(obj);
  }
  goToEcmReport(element){
    this.router.navigate(['/report/ecm-report' ,element.name,element._id] , { queryParams: { solutionId: this.solutionId}} );

  }

}