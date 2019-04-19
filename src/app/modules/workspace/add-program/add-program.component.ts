import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ProgramActionSheetComponent } from './action-sheet/program-action-sheet.component';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {
  opened = true;
  constructor( private bottomSheet :MatBottomSheet) { }

  ngOnInit() {
  }
  openBottomSheet(){
    this.bottomSheet.open(ProgramActionSheetComponent);
  }
}
