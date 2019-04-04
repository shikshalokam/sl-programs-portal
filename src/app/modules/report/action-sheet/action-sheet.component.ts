import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss']
})
export class ActionSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ActionSheetComponent>,private router: Router,
    @Inject(MAT_BOTTOM_SHEET_DATA) public links: any) { }

  ngOnInit() {
  }

  openLink(link): void {
    this.router.navigate([link.link+link.params], { queryParams: link.queryParams });
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }

}
