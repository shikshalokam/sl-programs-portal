import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder
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

  //   schoolData = [
  //     ['London',  82136000 ,136000,622000 ],
  //     ['London',  81326000 ,136000,326000 ],


  //   ];

  // schoolRoles = [
  //   { role: 'style', type: 'string', index: 2 }
  // ];
  // schoolColumnNames = ['Lead Acessor Name', 'Inhabitants','test','test2'];

  // myData = [
  //   ['Element', 10.5, '#ffaaff'] // The last entry in the array is the role
  // ];
  // schoolOptions = {
  //   colors: ['red', 'black', 'green', '#f3b49f'],
  //   is3D: true,
  //   isStacked: true,
  //   // ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180] // display labels every 10

  // };
  // schoolType="ColumnChart"



  // acessorRoles = [
  //   { role: 'style', type: 'string', index: 2 }
  // ];

  // myData = [
  //   ['Element', 10.5, '#ffaaff'] // The last entry in the array is the role
  // ];
  // acessorOptions = {
  //   colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
  //   is3D: true,
  //   // isStacked: true,
  //   // ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180] // display labels every 10

  // };


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
        is3D: true,
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
        width: '100%',
        heigth: '50vh'
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
    this.reportGenerate = true;
  }
  pageResponse(event) {
    console.log(event)
  }
  searchSchoolIdInApi(searchId){
    console.log(searchId)
  }
}
