import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  UtilityService } from 'shikshalokam';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ImageModalComponent } from '../ecm-report/image-modal/image-modal.component';
import { ReportService } from '../report-service/report.service';
import { GlobalConfig } from 'src/app/modules/global-config';
export interface DialogData {
  fileName: any;
}

@Component({
  selector: 'app-ecm-report',
  templateUrl: './ecm-report.component.html',
  styleUrls: ['./ecm-report.component.scss']
})
export class EcmReportComponent implements OnInit {
  schoolId;
  schoolName;
  error;
  ecmData;
  submissionData;
  submissionDataKey = [];
  answers = [];
  payloads = [];
  submissionId;
  data;
  questionNo = 1;
  imageArray = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTVf63Vm3XgOncMVSOy0-jSxdMT8KVJIc8WiWaevuWiPGe0Pm'];
  headings = 'headings.ecmReportsHeading';
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private reportService: ReportService, private utility: UtilityService,
    public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.schoolId = params["id"];
      this.schoolName = params["name"];
    });
    this.getEvedinceReport();
  }
  ngOnInit() {
    this.utility.loaderShow();
  }
  getEvedinceReport() {
    this.reportService.getEcmReportGetSubmissionId(this.schoolId).subscribe(
      data => {
        this.ecmData = data['result']['assessments'][0].evidences;
        this.submissionId = data['result']['assessments'][0].submissionId
        this.reportService.getSubmissionReport(this.submissionId).subscribe(
          data => {
            this.data = data['result'].evidences;
            const evidencesArray = Object.keys(this.data);
            this.submissionData = this.data[Object.keys(this.data)[0]].submissions;
            this.utility.loaderHide();
          },
          (error) => {
            this.error = error;
            //this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
            this.utility.loaderHide();
          }
        )
        this.utility.loaderHide();
      },
      (error) => {
        this.error = error;
        //this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
        this.utility.loaderHide();
      }
    );
  }
  objectKeys(obj) {
    return Object.keys(obj);
  }
  getIndex(event) {
    this.getSubmissionData(event.index);
  }

  getSubmissionData(index) {
    this.submissionData = this.data[this.ecmData[Object.keys(this.ecmData)[index]].externalId].submissions;
  }
  openDialog(imageFile): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: '650px',
      height: '600px',
      data: { fileName: imageFile },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
