import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator,MatSort, Sort } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';

elementData: {

}
@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  displayedColumns: string[] = ['externalId', 'name', 'city', 'state', 'isParentInterviewCompleted'];
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

  constructor(private reportService: ReportService, private utility: UtilityService) {
    this.showConfig();
    
    
  }
  
  onResize(event)
  {
    if(event.target.innerWidth < 760)
    {
      this.smallScreen = true;
    }
    else{
      this.smallScreen = false;
    }
  }
  showConfig() {
    this.reportService.getSchoolList()
      .subscribe(data => {
        console.log(data, "data in school-list");
        this.result = data['result']['length'];
        this.dataSource = new MatTableDataSource(data['result']);
        console.log(this.dataSource, "data source in school list")
        setTimeout(() => this.dataSource.sort = this.sort);
        this.schoolList = data['result'];
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


}