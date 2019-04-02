import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report-service/report.service';

import { ApiService, UtilityService } from 'shikshalokam';
import { MatSnackBar } from '@angular/material';
import { GlobalConfig } from 'src/app/global-config';

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
    ////console.logthis.router.snapshot)
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
      // this.insightReport['sections'][0].summary = [{"title":"Theme","value":"Teaching and Learning"},{"title":"Area of Inquiry:","value":"Resources (Human and Material)"}, {"title":"Indicator","value":"Human resources"}];
      this.utility.loaderHide(); 
    })
  }
    // this.apiService.getSingleEntityReport(this.programId, this.schoolId).subscribe(data => {
    //   this.insightReport = data['result'];
    //   this.utility.loaderHide(); 
    // })
  //   this.insightReport = {
  //     "Headings": "Performance Report for Entity Name",
  //     "summary": [
  //       {
  //         "title": "Name of Entity",
  //         "value": "Guru Harkrishan Public School, Hargobind Enclave Delhi"
  //       },
  //       {
  //         "title": "Date of Assessment",
  //         "value": "2019-03-28T14:10:21.635Z"
  //       }
  //     ],
  //     "sections": [
  //       {
  //         "subTitle": {},
  //         "table": true,
  //         "graph": true,
  //         "graphData": {
  //           "title": "Perfomance by themes",
  //           "subTitle": "Perfomance of a school across themes in the school development Framework",
  //           "chartType": "ColumnChart",
  //           "chartOptions": {
  //             "is3D": true,
  //             "isStacked": true,
  //             "vAxis": {
  //               "title": "Performance index(%)",
  //               "minValue": 0
  //             },
  //             "hAxis": {
  //               "title": "Themes",
  //               "showTextEvery": 1
  //             }
  //           }
  //         },
  //         "tabularData": {
  //           "headers": [
  //             {
  //               "name": "theme",
  //               "label": "Themes"
  //             },
  //             {
  //               "name": "value",
  //               "label": "Performance index(%)"
  //             }
  //           ]
  //         },
  //         "data": [
  //           {
  //             "theme": "Teaching and Learning",
  //             "value": 62.06,
  //             "SAMPLE":20,
  //             "new": 50

  //           },
  //           {
  //             "theme": "Safety and Security",
  //             "value": 59.60,
  //             "SAMPLE":20,
  //             "new": 20


  //           },
  //           {
  //             "theme": "Community Participation and EWS/DG Integration ",
  //             "value": 69.80,
  //             "SAMPLE":20,
  //             "new": 10


  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }


}
