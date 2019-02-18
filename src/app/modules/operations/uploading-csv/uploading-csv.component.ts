import { Component, OnInit, VERSION } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { OperationsService } from 'src/app/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uploading-csv',
  templateUrl: './uploading-csv.component.html',
  styleUrls: ['./uploading-csv.component.scss']
})
export class UploadingCsvComponent implements OnInit {
  fileUpload = false;
  CsvFileForm: FormGroup;
  uploadOprions = [
    { value: 'schools', viewValue: 'Upload Schools' },
    { value: 'assessors', viewValue: 'Upload Assessors' },
  ];
  file = [];
  headings='headings.uploadingCsv'
  uploadtype = '';
  percentDone: number = 0;
  uploadSuccess: boolean;
  fileSelected = false;
  uploadTypeSelected = false;
  formData;
  showStatus = false;
  programId;
  assessmentId;
  ngOnInit() {

  }


  constructor(
    private operationsService: OperationsService,
    private snackBar: MatSnackBar,
    fb: FormBuilder,
    private route :ActivatedRoute

  ) {
    this.CsvFileForm = fb.group({
      name: [""],
      fileName: [""]
    });
    // this.route.parent.queryParams.subscribe(params => {
    //   this.programId = params['programId'];
    //   this.assessmentId = params['assessmentId']

    // });
    this.programId = localStorage.getItem('currentProgram')['_id'];
    this.assessmentId = localStorage.getItem('currentAssessments')['_id'];

  }

  version = VERSION
  updateUploadType(uploadType) {
    if (uploadType != '')
      this.uploadTypeSelected = true;
    this.uploadtype = uploadType;

  }
  upload(files: File[]) {
    this.file = files;
    this.fileSelected = true;
    this.uploadAndProgress();
  }
  deleteFile(index, files) {
    files.value = null;
    this.fileSelected = false;
    this.showStatus = false;
    this.file = []
  }
  uploadAndProgress() {
    var formData = new FormData();
    if (this.uploadtype == 'schools') {
      Array.from(this.file).forEach(f => {
        formData.append('schools', f)
      })
    }
    else if (this.uploadtype == 'assessors') {
      Array.from(this.file).forEach(f => {
        formData.append('assessors', f)
      })

    }
    this.formData = formData;
    this.showStatus = true;
  }
  csvUpload() {
    this.operationsService.uploadCsv(this.formData, this.uploadtype,this.programId,this.assessmentId)
      .subscribe(event => {
        this.fileUpload = true;

        if (event.type === HttpEventType.UploadProgress) {

          this.percentDone = Math.round(100 * event.loaded / event.total);
          this.snackBar.open('Upload Sucessful', "Ok", { duration: 9000 });
        }
      },
        error => {
          this.snackBar.open(error['message'], "Ok", { duration: 9000 });
        });
    setTimeout(() => {
      this.CsvFileForm.reset();
      this.showStatus = false;
      this.fileSelected = false;
      this.uploadTypeSelected = false;
      this.percentDone = 0;
    }, 3000);
  }
}
