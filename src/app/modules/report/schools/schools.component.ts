import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  headings = 'headings.schoolListHeading';
  programId;
  searchVal;
  displayedColumns: string[] = ['name', 'city', 'state', 'action', 'action1'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private apiService: ReportService, private router: ActivatedRoute, private route: Router) {
    this.programId = this.router.snapshot.queryParamMap.get('programId');
  }

  ngOnInit() {
    this.getSchoolList();
  }

  applyFilter(filterValue: string) {
    this.searchVal = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSchoolList() {
    this.apiService.getUserSchoolsInProgram(this.programId).subscribe(successData => {
      this.dataSource =  new MatTableDataSource(successData['result'].schools);
      setTimeout(() => this.dataSource.sort = this.sort);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      
    }, error => {

    })
  }

  navigateToEntityReport(schoolId) {
    // this.route.n
    this.route.navigate(['/report/entity-report/'+schoolId], { queryParams: {programId: this.programId} });
  }
  navigateToHighEntityReport(schoolId){
    this.route.navigate(['/report/highlevel-entity-report/'+schoolId], { queryParams: {programId: this.programId} });

  }

}
