import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-service/report.service';
import { UtilityService } from 'shikshalokam';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-highlevel-entity-report',
  templateUrl: './highlevel-entity-report.component.html',
  styleUrls: ['./highlevel-entity-report.component.scss']
})
export class HighlevelEntityReportComponent implements OnInit {
  programId ; 
  schoolId;;
  highLevelInsight
  headings = "headings.highlevelEntityReport"
  constructor(private apiService: ReportService, private utility: UtilityService, private router: ActivatedRoute) {
    this.programId = this.router.snapshot.queryParamMap.get('ProgramId');
    this.schoolId = this.router.snapshot.params.schoolId;
  }

  ngOnInit() {
    this.utility.loaderShow();
    this.getHighEntityReport();
  }
 
  getHighEntityReport() {
    this.apiService.getHighEntityReport(this.programId, this.schoolId).subscribe(data => {
      this.highLevelInsight = data['result'];
      // this.insightReport['sections'][0].summary = [{"title":"Theme","value":"Teaching and Learning"},{"title":"Area of Inquiry:","value":"Resources (Human and Material)"}, {"title":"Indicator","value":"Human resources"}];
      this.utility.loaderHide(); 
    })
  }
}
