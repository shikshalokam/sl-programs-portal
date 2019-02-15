import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UtilityService } from 'src/app/core/services/utility-service/utility.service';
export interface DialogData {
}
@Component({
  selector: 'app-parent-heading',
  templateUrl: './parent-heading.component.html',
  styleUrls: ['./parent-heading.component.scss']
})

export class ParentHeadingComponent implements OnInit {
  @Input() genericHeading: string;
  @Input() schoolName;
  @Input() atleastOneComplete;
  @Input() schoolId;
  @Input() schoolNameDivider ;
  @Input() showControl;
  @Output() sendMarkAsComplete = new EventEmitter<boolean>();
  constructor( public dialog: MatDialog, private utilityService: UtilityService) { }

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.sendFlag();
    });
  }
  sendFlag() {
    this.sendMarkAsComplete.emit(true);
  }

  onBack() {
      this.utilityService.onBack();
  }
}
