import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-program-action-sheet',
  templateUrl: './program-action-sheet.component.html',
  styleUrls: ['./program-action-sheet.component.scss']
})
export class ProgramActionSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProgramActionSheetComponent>) {
    bottomSheetRef.disableClose = true;
   }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss({
      data:'hello'
    });
    event.preventDefault();
  }

  onCancel(){
    this.bottomSheetRef.dismiss();
  }
}