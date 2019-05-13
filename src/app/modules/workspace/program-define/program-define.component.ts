import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-define',
  templateUrl: './program-define.component.html',
  styleUrls: ['./program-define.component.scss']
})
export class ProgramDefineComponent implements OnInit {

  constructor(
    private router :Router
  ) { }

  ngOnInit() {
  }

  addProgram(type){
    if(type == 'add'){
      this.router.navigate(['/workspace/add-program']);
    }
    else {
      this.router.navigate(['/workspace/copy-template']);

    }
  }
}
