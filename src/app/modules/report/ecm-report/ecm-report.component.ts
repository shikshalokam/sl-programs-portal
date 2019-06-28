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
  solutionId: any;
  programId: void;
  evidencesArray: string[];
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private reportService: ReportService, private utility: UtilityService,
    public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.schoolId = params["id"];
      this.schoolName = params["name"];
    });
    this.route.queryParams.subscribe( params =>{
      this.solutionId = params['solutionId'];
    })
    this.programId = JSON.parse(localStorage.getItem('currentProgram'))._id;

    this.getEvedinceReport();
  }
  ngOnInit() {
    this.utility.loaderShow();
  }
  getEvedinceReport() {
    this.reportService.getEcmReportGetSubmissionId(this.programId,this.solutionId,this.schoolId).subscribe(
      data => {
        this.ecmData = data['result']['assessment'].evidences;
        this.submissionId = data['result']['assessment'].submissionId
        this.reportService.getSubmissionReport(this.submissionId).subscribe(
          data => {
            this.data = data['result'].evidences;
             this.evidencesArray = Object.keys(this.data);
            console.log(this.evidencesArray)
            this.evidencesArray.sort();
            this.submissionData = this.data[this.evidencesArray[0]].submissions;
            console.log(this.submissionData)
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
    console.log(this.ecmData[Object.keys(this.ecmData)[index]].externalId)
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
