import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from '../operations-service/operations.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { UtilityService } from 'shikshalokam';
@Component({
  selector: 'app-ops-report',
  templateUrl: './ops-report.component.html',
  styleUrls: ['./ops-report.component.scss']
})
export class OpsReportComponent implements OnInit {
  reportGenerate = false;
  schoolGraph;
  assessorGraph;
  headings = 'headings.opsReport'
  currentUser;
  dynamicResize;
  columnNames;
  searchSchoolId;
  filterData;
  // options;
  options = [{
    id: 12345,
    name: 'kumutha school'
  },
  {
    id: 12346,
    name: 'kumutha school'
  },
  {
    id: 12347,
    name: 'kumutha school'
  },
  {
    id: 12348,
    name: 'kumutha school'
  },
  {
    id: 12349,
    name: 'kumutha school'
  },
  {
    id: 12325,
    name: 'kumutha school'
  },
  {
    id: 12335,
    name: 'kumutha school'
  },
  {
    id: 12345,
    name: 'kumutha school'
  },
  {
    id: 12355,
    name: 'kumutha school'
  },
  {
    id: 12365,
    name: 'kumutha school'
  },
  {
    id: 12375,
    name: 'kumutha school'
  }]
  type = "PieChart";
  data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2]
  ];
  width = "200%";
  maxDate = new Date();
  filterResult = {
    type: [
      {
        key: "A1",
        value: "A1"
      },
      {
        key: "A2",
        value: "A2"
      },
      {
        key: "A3",
        value: "A3"
      },
      {
        key: "A4",
        value: "A4"
      },
      {
        key: "A5",
        value: "A5"
      },
      {
        key: "A6",
        value: "A6"
      },
      {
        key: "A7",
        value: "A7"
      },
      {
        key: "A8",
        value: "A8"
      },
      {
        key: "A9",
        value: "A9"
      },
      {
        key: "A10",
        value: "A10"
      }
    ],

    administration: [
      {
        key: "DOE",
        value: "DOE"
      },
      {
        key: "DoE_UnAided",
        value: "DoE_UnAided"
      },
      {
        key: "Aided",
        value: "Aided"
      }, {
        key: "SDMC",
        value: "SDMC"
      }, {
        key: "SDMC_Aided",
        value: "SDMC_Aided"
      },
      {
        key: "SDMC_Unaided",
        value: "SDMC_Unaided"
      },
      {
        key: "Government",
        value: "Government"
      },
      {
        key: "MCD",
        value: "MCD"
      },
      {
        key: "DCB",
        value: "DCB"
      },
      {
        key: "NDMC",
        value: "NDMC"
      },
      {
        key: "MCD_UnAided",
        value: "MCD_UnAided"
      },
      {
        key: "MCD_Unaided",
        value: "MCD_Unaided"
      },
      {
        key: "MCD_Aided",
        value: "MCD_Aided"
      }, {
        key: "NDMC_Aided",
        value: "NDMC_Aided"
      },
      {
        key: "NDMC_UnAided",
        value: "NDMC_UnAided"
      }, {
        key: "DoE_UnAided\r\n",
        value: "DoE_UnAided\r\n"
      },
      {
        key: "SSC",
        value: "SSC"
      }
    ]
  };
  filterForm: FormGroup;
  queryParamsUrl = '';
  searchValue: any;
  filterObject: any;
  filterArray: [string, {}][];
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private operationService:OperationsService,
    private utility :UtilityService
  ) {
    this.filterForm = this._fb.group({
      formDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params =>{
      console.log(params)
      this.filters(params['ProgramId']);

    })
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserDetails();
    console.log(this.maxDate)
    this.mapGraphObject();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
  this.filterObject= this.filterForm.getRawValue();
  for (let filter in this.filterObject) { 
    if (this.filterObject[filter] === null || this.filterObject[filter] === undefined || this.filterObject[filter] === "" || this.filterObject[filter] === "aN-aN-NaN")  {
      delete this.filterObject[filter];
      console.log(filter)
    }
  }
  this.filterObject['fromDate']= this.applyDate(this.filterObject.fromDate);
  this.filterObject['toDate']= this.applyDate(this.filterObject.toDate);
  console.log(this.filterObject['fromDate']);
  this.applyFilter(this.filterObject)
  console.log(this.filterObject)
  console.log(Object.entries(this.filterObject))
  this.filterArray = Object.entries(this.filterObject)
  // this.filterArray = Object.keys(this.filterObject).map(i => this.filterObject[i])
  this.buildqueryParams();
  }
  buildqueryParams(){

  }
  prevStep() {
    this.step--;
  }
   visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.filterArray.indexOf(fruit);

    if (index >= 0) {
      this.filterArray.splice(index, 1);
    }
  }
  dummyObject = {
    programName: "DCPCR School Development Index 2018-19",
    userRole: "leadAssessors",
    schoolsAssigned: 5538,
    managerName: "Aman Jung",
    reportGeneratedDate: "08-03-2019",
    schoolsInporgress: 2123,
    schoolsCompleted: 2112,
    averageTimeTakenForSchools: "5 days",
    assessorsReport: [
      {
        name: "Ajith",
        schoolsAssigned: 50,
        schoolsCompleted: 40,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Aman",
        schoolsAssigned: 50,
        schoolsCompleted: 30,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Akash",
        schoolsAssigned: 50,
        schoolsCompleted: 20,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Ajith",
        schoolsAssigned: 50,
        schoolsCompleted: 40,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Aman",
        schoolsAssigned: 50,
        schoolsCompleted: 30,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Akash",
        schoolsAssigned: 50,
        schoolsCompleted: 20,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Ajith",
        schoolsAssigned: 50,
        schoolsCompleted: 40,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Aman",
        schoolsAssigned: null,
        schoolsCompleted: 40,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Akash",
        schoolsAssigned: 50,
        schoolsCompleted: 20,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Ajith",
        schoolsAssigned: 50,
        schoolsCompleted: 40,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Aman",
        schoolsAssigned: 50,
        schoolsCompleted: 30,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      {
        name: "Akash",
        schoolsAssigned: 50,
        schoolsCompleted: 20,
        schoolCompletedInPercent: 60,
        averageDaysTaken: 3
      },
      
    ],
    schoolsReport: [
      {
        schoolName: "Kamaraj  school",
        status: "In Progress",
        daysElapsed: 50,
        completed: 30,
        assessmentCompletedInPercent: 60
      },
      {
        schoolName: "Government school",
        schoolStatus: "In Progress",
        daysElapsed: 50,
        schoolsCompleted: 30,
        assessmentCompletedInPercent: 20
      },
      {
        schoolName: "Kumutha matric higher secondary school",
        schoolStatus: "In Progress",
        daysElapsed: 50,
        schoolsCompleted: 30,
        assessmentCompletedInPercent: 49
      },
      {
        schoolName: "Kamaraj  school",
        status: "In Progress",
        daysElapsed: 50,
        completed: 30,
        assessmentCompletedInPercent: 75
      },
      {
        schoolName: "Government school",
        schoolStatus: "In Progress",
        daysElapsed: 50,
        schoolsCompleted: 30,
        assessmentCompletedInPercent: 30
      },
      {
        schoolName: "Kumutha matric higher secondary school",
        schoolStatus: "In Progress",
        daysElapsed: 50,
        schoolsCompleted: 30,
        assessmentCompletedInPercent: 50
      }
    ]
  }

  

  reportStatus = {};

  mapGraphObject() {
    const reportStatus = {};
    const objSchool = {};
    Object.assign(reportStatus, {
      data: [
        ["School Completed", this.dummyObject.schoolsCompleted],
        ["School In Progress", this.dummyObject.schoolsInporgress]

      ]
    })
    Object.assign(reportStatus, {
      columnNames: [
        "School Completed", "School In Progress"
      ]
    });
    Object.assign(reportStatus, {
      options: {
        colors: ['grey', 'green', 'yellow'],
        is3D: true,
      }
    });
    Object.assign(reportStatus, { type: 'PieChart' });
    this.reportStatus = reportStatus;
    Object.assign(objSchool, { schoolData: [] });
    this.dummyObject.schoolsReport.forEach(schools => {
      objSchool['schoolData'].push([schools.schoolName, schools.assessmentCompletedInPercent]);
    });
    Object.assign(objSchool, { schoolType: 'Line' });
    Object.assign(objSchool, {
      schoolOptions: {
        colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
        // is3D: true,
        isStacked:'percent',
        vAxis:{"title":"# of movies","minValue":0},
        hAxis:{"title":"Ratings",showTextEvery:1},
      }
    });
    Object.assign(objSchool, { schoolColumnNames: ['School Name', '% Completion of Assessments'] });
    this.schoolGraph = objSchool;
    console.log(this.schoolGraph)
    const objAssessor = {};
    Object.assign(objAssessor, { assessorData: [] });

    this.dummyObject.assessorsReport.forEach(assessor => {
      objAssessor['assessorData'].push([assessor.name, assessor.schoolsAssigned, assessor.schoolsCompleted]);
    });
    Object.assign(objAssessor, { assessorType: 'ColumnChart' });

    Object.assign(objAssessor, {
      assessorOptions: {
        colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
        is3D: true,
        isStacked: true,
        // isStacked: 'percent',
        vAxis:{"title":"# of movies","minValue":0},
      hAxis:{"title":"Ratings",showTextEvery:0},
      }
    });
    Object.assign(objAssessor, { assessorColumnNames: ['Assessor Name', 'Assigned ', 'Completed'] });
    this.assessorGraph = objAssessor;
    console.log(this.assessorGraph)
  }
  applyDate(value) {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const val = [day, mnth, date.getFullYear()].join("-");
    // this.applyFilter({ [label]: val });
    return val;
  }
  applyFilter(obj) {

    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams: obj, queryParamsHandling: "merge",
      preserveFragment: true
    });
    this.route.queryParams.subscribe(params => {
    });
    // const urlTree = this.router.createUrlTree([], {
    //   queryParams: { newParamKey: 'newValue' },
    //   queryParamsHandling: "merge",
    //   preserveFragment: true 
    // });
    // this.router.navigateByUrl(urlTree); 
    this.generateReport();
  }

  inputChange(key, event) {
    this.applyFilter({ [key]: event.target.value });
    if(key == 'schoolId'){
      this.searchSchoolId = event.target.value;
    }
  }
  selectType(key, value) {
    this.applyFilter({ [key]: value })

  }
  generateReport() {
    let param;
    this.route.queryParams.subscribe(params => {
      param = params
    });

    this.queryParamsUrl = param['ProgramId'] + "?";
    console.log(param)
    let paramKey = Object.keys(param);
    paramKey = paramKey.slice(1)
    let index = 0;
    paramKey.forEach(element => {
      if (index == 0) {
        this.queryParamsUrl += element + '=' + param[element]
      }
      else {
        this.queryParamsUrl += '&' + element + '=' + param[element]
      }
      index++;
    })
    console.log(this.queryParamsUrl)
    this.reportsDataFetch();
    this.reportGenerate = true;
  }
  pageResponse(event) {
    console.log(event)
  }
  reportsDataFetch(){
  //  this.filters();
   this.getUserSummary();
   this.getSchoolReport();
   this.getAssessorReport();
  }

  filters(url){
    this.operationService.applyFilters(url).subscribe( data => {
      console.log(data);

      this.filterData = data['result'];

     this.filterForm= this.utility.toGroup(data['result']);
      console.log(this.filterData);
      console.log(this.filterForm);

    });
  }
  getUserSummary(){
    console.log("summary")
    this.operationService.getUserSummary(this.queryParamsUrl).subscribe( data => {
      console.log(data);

    });
  }
  getSchoolReport(){

    this.operationService.getSchoolReport(this.queryParamsUrl).subscribe( data => {
      console.log(data);

    });
  }
  getAssessorReport(){
    this.operationService.getAssessorReport(this.queryParamsUrl).subscribe( data => {
      console.log(data);

    });
  }
  searchSchoolIdInApi(searchId){
    console.log(searchId)
  }
  searchVal(searchValue){
    this.searchValue = searchValue;
  }
}
