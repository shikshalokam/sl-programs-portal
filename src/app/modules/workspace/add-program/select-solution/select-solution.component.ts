import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { link } from 'fs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-select-solution',
  templateUrl: './select-solution.component.html',
  styleUrls: ['./select-solution.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
    }, {
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
    },
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
    }, {
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
  displayedColumns: string[] = ['select', 'title', 'description'];
dataSource = new MatTableDataSource(this.solutions);
selection = new SelectionModel(true, []);
expandedElement;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }
  
  searchInApi(event){
    console.log(event)
  }

  changeSolutionType(type){
    this.selectSolutionType = type;
  }
  onAddSolution(){
    // this.router.navigate(['/workspace/add-program']);
    console.log(this.selection.selected)
  }
  insertSolution(){

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  solutionDetails(solution){
    let link ='/workspace/solution-details';
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  
  }
    toggleRow(row) {
      console.log(row);
      this.selection.toggle(row);

    }
}

