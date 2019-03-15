import { Component, OnInit, VERSION } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { OperationsService } from '../operations-service/operations.service';
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
  schoolFile = [];
  assessorFile =[];
  headings='headings.uploadingCsv'
  uploadtype = '';
  percentDone: number = 0;
  uploadSuccess: boolean;
  assessorFileSelected = false;
  schoolFileSelected = false;

  uploadTypeSelected = false;
  formData;
  showSchoolStatus = false;
  showAssessorStatus = false;
  files = {value: ""};

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
   
    this.programId = JSON.parse( localStorage.getItem('currentProgram'))['_id'];
    this.assessmentId = JSON.parse( localStorage.getItem('currentAssessments'))['_id'];
  }

  version = VERSION

  uploadAssessor(files:File[]) {
    this.assessorFile = files;
    console.log(files)
    this.assessorFileSelected = true;
    this.showAssessorStatus = true;

  }
  uploadSchools(files:File[]) {
    this.schoolFile = files;
    console.log(files)
    this.schoolFileSelected = true;
    this.showSchoolStatus = true;

  }
  deleteSchoolFile(index, files) {
    files.value = null;
    this.schoolFileSelected = false;
    this.showSchoolStatus = false;
    this.schoolFile = []
  }
  deleteAssessorFile(index, files) {
    files.value = null;
    this.assessorFileSelected = false;
    this.showAssessorStatus = false;
    this.assessorFile = []
  }


  csvUpload(uploadType) {
    let file ;
    if(uploadType == 'schools'){
      file = this.schoolFile;
    }
    else{
      file = this.assessorFile;
    }
    this.operationsService.uploadCsv(file,uploadType,this.programId,this.assessmentId)
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
      if(uploadType == 'schools'){
      this.showSchoolStatus = false;
      this.schoolFileSelected = false;
      this.schoolFile = [];
      }
      if (uploadType == 'assessors'){
      this.showAssessorStatus= false;
      this.assessorFileSelected = false;
      this.assessorFile = [];
      }
      
      this.uploadTypeSelected = false;
      this.percentDone = 0;
      this.fileUpload= false;
    }, 3000);
  }
}
