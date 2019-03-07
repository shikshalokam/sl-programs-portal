import { Component, OnInit } from '@angular/core';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-inside-report',
  templateUrl: './inside-report.component.html',
  styleUrls: ['./inside-report.component.scss']
})
export class InsideReportComponent implements OnInit {

  schoolGraph ;
  assessorGraph ;
  constructor() { }

  ngOnInit() {

    this.mapGraphObject();
  }
 dummyObject = {
  managerName: "?",
  programName: "-",
  period: "?",
  reportGeneratedDate: "-",
  schoolsAssigned: "-",
  schoolsInporgress: "-",
  schoolsCompleted: "-",
  averageTimeTakenForSchools: "-",
  assessorsReport:[
      {
          name:"Ajith",
          schoolsAssigned:50,
          schoolsCompleted:30,
          schoolCompletedInPercent:60,
          averageDaysTaken:3
      },
      {
          name:"Aman",
          schoolsAssigned:50,
          schoolsCompleted:30,
          schoolCompletedInPercent:60,
          averageDaysTaken:3
      },
      {
          name:"Akash",
          schoolsAssigned:50,
          schoolsCompleted:30,
          schoolCompletedInPercent:60,
          averageDaysTaken:3
      }
  ],
  schoolsReport:[
      {
          schoolName:"Kamaraj  school",
          status:"In Progress",
          daysElapsed:50,
          completed:30,
          assessmentCompletedInPercent:60
      },
      {
          schoolName:"Government school",
          schoolStatus:"In Progress",
          daysElapsed:50,
          schoolsCompleted:30,
          assessmentCompletedInPercent:20
      },
      {
          schoolName:"Kumutha matric higher secondary school",
          schoolStatus:"In Progress",
          daysElapsed:50,
          schoolsCompleted:30,
          assessmentCompletedInPercent:90
      }
  ]
}

//   schoolData = [
//     ['London',  82136000 ,136000,622000 ],
//     ['London',  81326000 ,136000,326000 ],
    
   
//   ];
  
//   schoolRoles = [
//     { role: 'style', type: 'string', index: 2 }
//   ];
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

  // acessorData = [
  //   ['London', 8136000 , 123123],
  //   ['New York', 8538000,789789],
  //   ['Paris', 2244000,789789],
  //   ['Berlin', 3470000,789789],
  //   ['Kairo', 19500000,789789],
   
  // ];
  
  // acessorRoles = [
  //   { role: 'style', type: 'string', index: 2 }
  // ];
  // acessorColumnNames = ['Lead', 'Number Of school Assigned','Number of school completed'];
  
  // myData = [
  //   ['Element', 10.5, '#ffaaff'] // The last entry in the array is the role
  // ];
  // acessorOptions = {
  //   colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
  //   is3D: true,
  //   // isStacked: true,
  //   // ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180] // display labels every 10

  // };
  // acessorType="Line"



  mapGraphObject(){
    const objSchool = {};
    Object.assign(objSchool, {schoolData: []});
    this.dummyObject.schoolsReport.forEach(schools => {
      objSchool['schoolData'].push([schools.schoolName , schools.assessmentCompletedInPercent]);
    });
    Object.assign(objSchool , {schoolType :'Line'} );
    Object.assign(objSchool ,{schoolOptions : {
      colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
      is3D: true,
    }});
    Object.assign(objSchool,{schoolColumnNames:['School Name' , '% Completion of Assessments']});
    this.schoolGraph = objSchool;
    console.log(this.schoolGraph)
    const objAssessor ={};
    Object.assign(objAssessor, {assessorData: []});

    this.dummyObject.assessorsReport.forEach(assessor => {
      objAssessor['assessorData'].push([assessor.name , assessor.schoolsAssigned,assessor.schoolsCompleted]);
    });
    Object.assign(objAssessor , {assessorType :'ColumnChart'} );

    Object.assign(objAssessor ,{assessorOptions : {
      colors: ['red', 'black', 'green', '#f3b49f', '#f6c7b6'],
      is3D: true,
    isStacked: true,
    }});
    Object.assign(objAssessor,{assessorColumnNames:['Assessor Name' , 'Assigned ','Completed' ]});
   this.assessorGraph = objAssessor;
   console.log(this.assessorGraph)
  }
}
