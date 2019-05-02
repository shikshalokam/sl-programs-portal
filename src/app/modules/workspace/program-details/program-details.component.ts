import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {

  metaData =  {
    description: "program description in details",
    externalId: "Exterenal Id",
    fromDate:" Sun Apr 07 2019",
    keyWords:['program','solution'],
    language: ["english"],
    programName: "Program Name",
    programTitle: "Program Title",
    toDate: "Wed Apr 17 2019",
    solutions:[
      {
        title: "DCPCR",
        description:"Dcpcr solutions for adding in programs",
        icon: 'assignment_turned_in ',
      },
      {
        title: "MYANTRA",
        description:"Myantra solutions for adding in programs",
        icon: 'assignment_turned_in ',
      },
      {
        title: "TUNERLABS",
        description:"Tunerlabs solutions for adding in programs",
        icon: 'assignment_turned_in ',
      },
      {
        title: "Tibel",
        description:"Tibel solutions for adding in programs",
        icon: 'assignment_turned_in ',
      }
    ]
      }
      columnsToDisplay=['title','description'];
  headings="headings.programDetails";
  constructor( private router : Router) { }

  ngOnInit() {
  }

  solutionDetails(solution){
    console.log(solution) 
    let link ='/workspace/solution-details';
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });

  }
}
