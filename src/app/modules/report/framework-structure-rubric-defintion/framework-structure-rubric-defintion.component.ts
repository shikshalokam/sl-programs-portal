import { Component, OnInit } from '@angular/core';
import { UtilityService, ApiService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { MatSnackBar } from '@angular/material';
import { GlobalConfig } from 'src/app/global-config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-framework-structure-rubric-defintion',
  templateUrl: './framework-structure-rubric-defintion.component.html',
  styleUrls: ['./framework-structure-rubric-defintion.component.scss']
})
export class FrameworkStructureRubricDefintionComponent implements OnInit {

  frameWorkUrl;
  rubricData;
  headings = 'headings.frameWorkStructureRubricLevel';
  constructor(
    private reportService: ReportService,
    private utility: UtilityService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.utility.loaderShow();
    this.router.queryParams.subscribe(link => {
      this.frameWorkUrl = link['link'];
      this.getFrameWorkRubric();

    })
  }
  getFrameWorkRubric() {
    this.reportService.getFrameWorkStructureRubric(this.frameWorkUrl).subscribe(successData => {
      this.rubricData = successData['result'];
      console.log(this.rubricData)
      this.utility.loaderHide();
    },
      error => {
        this.utility.loaderHide();
        this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 2000 });
      }
    )
  }
}
