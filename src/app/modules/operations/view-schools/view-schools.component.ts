import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
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
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operationsService: OperationsService,
     private utility: UtilityService,
     private route :ActivatedRoute
    
    ) {
    this.showConfig();
    this.route.parent.queryParams.subscribe(params => {
      console.log(params);
      this.programId = params['programId'];
      this.assessmentId = params['assessmentId']

    });
  }
  showConfig() {
    this.operationsService.getSchools(this.programId,this.assessmentId)
      .subscribe(data => {
        this.schoolList = data['result'];
        this.result = data['result']['length'];
        this.dataSource = new MatTableDataSource(data['result']);
        setTimeout(() => this.dataSource.paginator = this.paginator);
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
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
}
