import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  
})
export class OperationsComponent implements OnInit {
  programId;
  assessmentId;
  constructor(private route : ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.programId = params["programId"];
      this.assessmentId = params["assessmentId"];
    });
  }

  ngOnInit() {
  }

}
