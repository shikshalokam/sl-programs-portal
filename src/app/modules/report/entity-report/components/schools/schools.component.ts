import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { ReportService } from '../../../report-service/report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  headings = 'headings.schoolListHeading';
  programId;
  displayedColumns: string[] = ['name', 'city', 'state', 'action'];
  dataSource;

  constructor(private apiService: ReportService, private router: ActivatedRoute, private route: Router) {
    this.programId = this.router.snapshot.queryParamMap.get('ProgramId');
  }

  ngOnInit() {
    this.getSchoolList();
  }

  getSchoolList() {
    this.apiService.getUserSchoolsInProgram(this.programId).subscribe(successData => {
      this.dataSource = successData['result'].schools;
    }, error => {

    })
  }

  navigateToEntityReport(schoolId) {
    // this.route.n
    this.route.navigate(['/report/entity-report/'+schoolId], { queryParams: {ProgramId: this.programId} });
  }

}
