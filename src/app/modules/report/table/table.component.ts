import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatBottomSheet } from '@angular/material';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import { ReportService } from '../report-service/report.service';
import { UtilityService } from 'shikshalokam';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() dataSource;
  displayedColumns: string[] = ['select','name', 'city','actions'];
  columnsForBlockTable: string[] = ["labels", "action"];
  programId;
  selection;
  numSelected;
  numRows;
  blockId;
  @Input() link;
  @Input() apidata;
  @Input() blockData;
  enableMultiSchool: boolean;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  



  constructor(private bottomSheet: MatBottomSheet, private route: ActivatedRoute, private reportService: ReportService, private utility: UtilityService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
    });


  }
 
ngOnInit(){
  this.page();
  // console.log(this.test, "test in ts")
  // console.log(this.test,"page index")
}


isAllSelected() {
  const numSelected = this.selection ? this.selection.selected.length : 0;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;

}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;

}

checkboxLabel(row?): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

goToSingilEntityReport(id) {
  console.log("clicked", id);
  this.router.navigate(['/report/block-list/'], { queryParams: { ProgramId: this.programId, Id: id } });
}

getAction(actionFor, blockName, schoolId?: any) {
  if (actionFor === 'multiEntity') {
    const schoolArray = []
    for (const item of this.selection.selected) {
      schoolArray.push(item._id);
    }
    for (const link of this.link[actionFor]) {
      link.queryParams.school = Object.assign([], schoolArray);
      link.queryParams.blockName = blockName;
    }
  } else {
    for (const link of this.link[actionFor]) {
      link.params = schoolId;
    }
  }

  console.log(this.link[actionFor]);
  this.bottomSheet.open(ActionSheetComponent, { data: this.link[actionFor] })
}


toggleRow(row) {
  this.selection.toggle(row);
  this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;
}


page(){

  // console.log(this.apidata, "api data");

  // this.selection = new SelectionModel(true, []);


  this.dataSource = new MatTableDataSource(this.apidata['result']['schools']);
  // this.paginator.pageSize = 5;
  // this.paginator.pageIndex = 0;
  // this.paginator.length = this.apidata['result']['schools'].length;
  this.dataSource.paginator = this.paginator;
  this.selection = new SelectionModel(true, []);

  



}



}


  


