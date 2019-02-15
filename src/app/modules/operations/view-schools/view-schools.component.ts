import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator,  } from '@angular/material';
import { UtilityService } from 'src/app/core/services/utility-service/utility.service';
import { OperationsService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-schools',
  templateUrl: './view-schools.component.html',
  styleUrls: ['./view-schools.component.scss']
})
export class ViewSchoolsComponent implements OnInit {
  displayedColumns: string[] = ['externalId', 'name', '_id'];
  dataSource;
  schoolList;
  result;
  error: any;
  smallScreen = false;
  programId ;
  assessmentId ;
  headings = 'headings.schoolListHeading';
  search='';
  pageIndex:number=0;
  pageSize:number=50;
  length:number;
  searchValue='';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationsService: OperationsService,
     private utility: UtilityService,
     private route :ActivatedRoute

    ) {
    // this.route.parent.queryParams.subscribe(params => {
    //   console.log(params);
    //   this.programId = params['programId'];
    //   this.assessmentId = params['assessmentId']

    // });
      this.assessmentId = localStorage.getItem('assessmentId');
      this.programId = localStorage.getItem('programId');
    this.getViewSchool()
  }
  getViewSchool() {
    this.utility.loaderShow();
    this.operationsService.getSchools(this.programId,this.assessmentId,this.search,this.pageIndex,this.pageSize)
      .subscribe(data => {
        this.schoolList = data['result']['schoolInformation'];
        this.result = data['result']['schoolInformation'].length;
        this.length = data['result']['totalCount'];
        this.dataSource = new MatTableDataSource(data['result']['schoolInformation']);
        // setTimeout(() => this.dataSource.paginator = this.paginator);
        this.utility.loaderHide()
      },
        (error) => {
          this.error = error;
          this.utility.loaderHide();
          ;
        }
      );
  }
  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase())
    this.searchValue = filterValue ;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.utility.loaderShow();
    if (window.screen.width < 760) { // 768px portrait
      this.smallScreen = true;
      console.log(this.smallScreen)
    }
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }
  onResize(event)
  {
    console.log(event);
    if(event.target.innerWidth > 760)
    {
      console.log(true)
      this.smallScreen = true;
    }
  }
  pageEvent(event){
   
    if(this.pageSize !== event.pageSize)
    {
      this.pageSize = event.pageSize;
    }
    this.pageIndex = event.pageIndex;
    this.getViewSchool();
  }
  searchInApi(event){
    this.search=event;
    this.pageIndex = 0;
    this.getViewSchool();
  }
}
