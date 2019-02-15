import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-program-sidenav',
  templateUrl: './program-sidenav.component.html',
  styleUrls: ['./program-sidenav.component.scss']
})
export class ProgramSidenavComponent implements OnInit {
  @Input() result: any;
  currentProgramIndex: number;

  constructor() { }

  @Output() program = new EventEmitter();

  ngOnInit() {
    this.currentProgramIndex = 0;
  }

  programSelect(assessments, i){
    this.currentProgramIndex = i;
    this.program.emit(assessments);
  }
}
