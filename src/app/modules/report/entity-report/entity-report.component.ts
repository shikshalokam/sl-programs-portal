import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { UtilityService } from 'shikshalokam';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report-service/report.service';


@Component({
  selector: 'app-entity-report',
  templateUrl: './entity-report.component.html',
  styleUrls: ['./entity-report.component.scss']
})
export class EntityReportComponent implements OnInit {

  headings = 'headings.reportEntityReport'
  entityResult;
  insightReport;
  programId;
  schoolId;

  constructor(private apiService: ReportService, private utility: UtilityService, private router: ActivatedRoute) {
    this.programId = this.router.snapshot.queryParamMap.get('ProgramId');
    this.schoolId = this.router.snapshot.params.schoolId;
    console.log(this.router.snapshot)
  }

  ngOnInit() {
    this.utility.loaderShow();
    this.getEntityReport();
  }
  setColor() {
    let index = 0;
    let colorArray = [];
    this.entityResult.forEach(element => {
      if (element.reportType == "tableGraph") {
        let colorArrayLength = element.graphData.data[0].length;
        for (let i = 1; i < colorArrayLength;) {
          let uniqueColor = this.getRandomColor();
          if (!(colorArray.includes(uniqueColor) && uniqueColor.includes('#f'))) {
            colorArray.push(uniqueColor);
            i++;
          }

        }
        this.entityResult[index].graphData.chartOptions.colors = colorArray;
      }
      index++;
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getEntityReport() {
    this.apiService.getSingleEntityReport(this.programId, this.schoolId).subscribe(data => {
      this.insightReport = data['result'];
      this.utility.loaderHide(); 
    })
  }


}
