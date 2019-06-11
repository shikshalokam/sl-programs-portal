import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-solution',
  templateUrl: './select-solution.component.html',
  styleUrls: ['./select-solution.component.scss']
})
export class SelectSolutionComponent implements OnInit {
  searchSolution = '';
  selectSolutionType ='All';
  solutionType = ['All','Assessments'];
  solutions = [
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
  headings:"headings.selectSolution";
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }
  applyFilter(event){
    this.searchSolution = event;
  }
  searchInApi(event){
    console.log(event)
  }

  changeSolutionType(type){
    this.selectSolutionType = type;
  }
  onAddSolution(){
    this.router.navigate(['/workspace/add-program']);
  }
  insertSolution(){

  }
}
