import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report-service/report.service';
import { UtilityService } from 'shikshalokam';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multiple-entity-report',
  templateUrl: './multiple-entity-report.component.html',
  styleUrls: ['./multiple-entity-report.component.scss']
})
export class MultipleEntityRportComponent implements OnInit {
  mutipleEntity;
  programId ;
  headings = "heading.reportMiltipleEntityReport";
  schoolId ;
  constructor(
    private reportService: ReportService,
    private utility: UtilityService,
    private snackBar: MatSnackBar,
    private route: Router,
    private router : ActivatedRoute
  ) { }

  ngOnInit() {
    this.utility.loaderShow();
    this.router.queryParams.subscribe( params =>{
      this.schoolId = params['school'];
      this.programId = params['ProgramId'];
    })
    this.getMultiEntityReport();
  }
  getMultiEntityReport() {
    this.reportService.getMultipleEntityReport(this.programId, this.schoolId).subscribe(successData => {
      this.mutipleEntity = successData['result'];
      this.createNewData();
      console.log(this.mutipleEntity);

      this.utility.loaderHide();
    })
  }
  url = "PROGID01?school="
  createNewData() {


    this.mutipleEntity.sections.forEach((element, sectionIndex) => {
      element.subSections.forEach((subSections, subSectionsIndex) => {

        let newgraphData = [];
        for (const data of this.mutipleEntity['sections'][sectionIndex]['subSections'][subSectionsIndex].data) {
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
        this.mutipleEntity['sections'][sectionIndex]['subSections'][subSectionsIndex]['newGraphData'] = newgraphData;
      });

    });

  }
  naviagteToRubrics() {
    this.route.navigate(["/report/framework-rubric"], { queryParams: { link: this.mutipleEntity.frameworkUrl.link } });
  }
}