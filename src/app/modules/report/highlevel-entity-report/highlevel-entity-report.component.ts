import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-service/report.service';
import { UtilityService } from 'shikshalokam';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { GlobalConfig } from 'src/app/global-config';

@Component({
  selector: 'app-highlevel-entity-report',
  templateUrl: './highlevel-entity-report.component.html',
  styleUrls: ['./highlevel-entity-report.component.scss']
})
export class HighlevelEntityReportComponent implements OnInit {
  programId;
  schoolId;;
  highLevelInsight
  headings = "headings.highlevelEntityReport"
  constructor(private apiService: ReportService,
    private utility: UtilityService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private route: Router
  ) {
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
      const newgraphData = []

      for (const data of this.highLevelInsight['sections'][0]['subSections'][0].data) {
        let newData = Object.assign({}, data);
        let totalCountArray: Array<number> = Object.values(newData);
        totalCountArray.splice(0, 1);
        let totalcount: number = 0;
        for (let element of totalCountArray) {
          totalcount = element + totalcount;
        }

        const objKeys = Object.keys(newData);
        objKeys.splice(0, 1);
        for (const key of objKeys) {
          newData[key] = (data[key] / totalcount) * 100;
        }
        newgraphData.push(newData);
      }
      this.highLevelInsight['sections'][0]['subSections'][0]['newGraphData'] = newgraphData;
      this.utility.loaderHide();
    },
      (error) => {
        this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
        this.utility.loaderHide();
      }
    )
  }
  naviagteToRubrics() {
    this.route.navigate(["/report/framework-rubric"], { queryParams: { link: this.highLevelInsight.frameworkUrl.link } });
  }
}
