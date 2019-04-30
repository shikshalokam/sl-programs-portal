import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { ProgramActionSheetComponent } from './action-sheet/program-action-sheet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { newProgram } from '../add-program-meta-data/programApi';
import { FormArray, Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService, ApiService } from 'shikshalokam';
import { HttpEventType } from '@angular/common/http';
import { WorkspaceService } from '../workspace-service/workspace.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {
  opened = true;
  programsForm: any;
  programData;
  group;
  showPrograms: boolean = true;
  showSolution: boolean = false;
  headings: "headings.addProgram";
  solutionList;
  currentSolution;
  solutionForm;
  constructor(
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private apiService: ApiService,
    private workspaceService: WorkspaceService,
    private snackBar: MatSnackBar,

  ) {
    this.CsvFileForm = _formBuilder.group({
      name: [""],
      fileName: [""]
    });
   }

  ngOnInit() {
    this.programData = newProgram;
    this.apiService.get('/assets/solutionList.json').subscribe(solutionList => {
      // console.log(solutionList);
      this.solutionList = solutionList['components'];
    })
    this.group = this._formBuilder.group({});
    this.createForm(this.programData);
  }


  createForm(objectArray) {
    this.programsForm = this.utilityService.createControl(objectArray);

  }
  selectSolution() {
    this.router.navigate(['/workspace/select-solution'])
  }
  openBottomSheet() {
    this.bottomSheet.open(ProgramActionSheetComponent);
    this.bottomSheet._openedBottomSheetRef.afterDismissed().subscribe(data => {
      console.log(data)
      if (data) {
        this.showPrograms = true;
      }
    })
  }
  showSolutions(solution) {
    this.currentSolution = solution;
    this.solutionForm = this.utilityService.createControl(this.currentSolution['form']);
  }

  fileUpload = false;
  CsvFileForm: FormGroup;
 
  addHierarchyFile = [];
  addUserFile =[];
  uploadtype = '';
  percentDone: number = 0;
  uploadSuccess: boolean;
  addUserFileSelected = false;
  addHierarchyFileSelected = false;

  uploadTypeSelected = false;
  formData;
  showAddUserStatus = false;
  showAddHierarchyStatus = false;
  files = {value: ""};

  

  uploadAddUser(files:File[]) {
    this.addUserFile = files;
    this.addUserFileSelected = true;
    this.showAddUserStatus = true;
  }
  uploadAddHierarchy(files:File[]) {
    this.addHierarchyFile = files;
    this.addHierarchyFileSelected = true;
    this.showAddHierarchyStatus = true;

  }
  deleteAddUserFile(index, files) {
    // files = {};
    // files.length = 0
    this.addUserFileSelected = false;
    this.showAddUserStatus = false;
    this.addUserFile = []
  }
  deleteAddHierarchyFile(index, files) {
    files.value = null;
    this.addHierarchyFileSelected = false;
    this.showAddHierarchyStatus = false;
    this.addHierarchyFile = []
  }


  csvUpload(uploadType) {
    let file ;
    if(uploadType == 'addUser'){
      file = this.addUserFile;
    }
    else{
      file = this.addHierarchyFile;
    }
    this.workspaceService.uploadCsv(file,uploadType)
      .subscribe(event => {
        this.fileUpload = true;
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        }
      },
        error => {
        });
    setTimeout(() => {
      if(uploadType == 'addUser'){
      this.showAddUserStatus = false;
      this.addUserFileSelected = false;
      this.addUserFile = [];
      }
      if (uploadType == 'addHierarchy'){
      this.showAddHierarchyStatus= false;
      this.addHierarchyFileSelected = false;
      this.addHierarchyFile = [];
      }
      
      this.uploadTypeSelected = false;
      this.percentDone = 0;
      this.fileUpload= false;
    }, 3000);
  }
}
