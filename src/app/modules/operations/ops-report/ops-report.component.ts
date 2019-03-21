import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from '../operations-service/operations.service';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private operationService:OperationsService
  ) {
    this.filterForm = this._fb.group({
      formDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserDetails();
    console.log(this.currentUser)
    this.mapGraphObject();
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
  applyDate(label, value) {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const val = [day, mnth, date.getFullYear()].join("-");
    this.applyFilter({ [label]: val });
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
   this.filters();
   this.getUserSummary();
   this.getSchoolReport();
   this.getAssessorReport();
  }

  filters(){
    this.operationService.applyFilters(this.queryParamsUrl).subscribe( data => {
      console.log(data);
    });
  }
  getUserSummary(){
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
