import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';

@Component({
  selector: 'app-ops-report',
  templateUrl: './ops-report.component.html',
  styleUrls: ['./ops-report.component.scss']
})
export class OpsReportComponent implements OnInit {

  schoolGraph;
  assessorGraph;
  headings = 'headings.opsReport'
  currentUser ;
  dynamicResize;
  columnNames;
  options;
  type="PieChart";
  data =   [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2]
  ];
  width = "200%";

  constructor(private authService :AuthService) { }

  ngOnInit() {
    this.currentUser= this.authService.getCurrentUserDetails();
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
      }
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
        assessmentCompletedInPercent: 90
      },
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
        assessmentCompletedInPercent: 90
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
    Object.assign(reportStatus,{ data:[
      ["School Completed", this.dummyObject.schoolsCompleted],
      ["School In Progress", this.dummyObject.schoolsInporgress]

    ]})
    Object.assign(reportStatus,{columnNames:[
      "School Completed","School In Progress"
    ]});
    Object.assign(reportStatus, {
      options: {
        colors: ['grey', 'green', 'yellow'],
        is3D: true,
      }
    });
    Object.assign(reportStatus,{type:'PieChart'});
    this.reportStatus =  reportStatus;
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
        width:'100%',
        heigth:'50vh'
      }
    });
    Object.assign(objAssessor, { assessorColumnNames: ['Assessor Name', 'Assigned ', 'Completed'] });
    this.assessorGraph = objAssessor;
    console.log(this.assessorGraph)
  }
}
