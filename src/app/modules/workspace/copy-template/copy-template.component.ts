import { Component, OnInit } from '@angular/core';
import { ApiService } from 'shikshalokam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-template',
  templateUrl: './copy-template.component.html',
  styleUrls: ['./copy-template.component.scss']
})
export class CopyTemplateComponent implements OnInit {
  programList;
  programTabListOpened = true
  currentProgram: any;
  constructor(
    private apiService :ApiService,
    private router :Router
  ) { }

  ngOnInit() {
    this.apiService.get('/assets/programList.json').subscribe(programList => {
      console.log(programList);
      this.programList =programList['result'];
      this.currentProgram = this.programList[0];
    })

  }
  changeCurrerntProgram(index){
    this.currentProgram = this.programList[index];
  }

  copyProgram(){
    this.router.navigate(['/workspace/add-program']);
  }
}
