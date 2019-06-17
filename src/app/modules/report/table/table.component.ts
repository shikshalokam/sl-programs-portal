import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatBottomSheet, MatSnackBar } from '@angular/material';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';
import { ReportService } from '../report-service/report.service';
import { UtilityService } from 'shikshalokam';
import { SelectionModel } from '@angular/cdk/collections';
import { GlobalConfig } from '../../global-config';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['select', 'name', 'city', 'actions'];
  programId;
  selection;
  numSelected;
  numRows;
  blockId;
  @Input() link;
  @Input() data;
  @Input() blockData;
  @Input() zoneId;
  enableMultiSchool: boolean;
  searchVal;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  limitSelection: any = 2;
  solutionId: any;
  constructor(private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private utility: UtilityService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["programId"];
      this.solutionId = params["solutionId"];

    });
  }
  ngOnInit() {
    this.getSchoolList(this.zoneId);
  }

  applyFilter(filterValue: string) {
    this.searchVal = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  isAllSelected() {
    // console.log("isselected all called");
    const numSelected = this.selection ? this.selection.selected.length : 0;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    // console.log("master toggle");

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;

  }

  checkboxLabel(row?): string {
    // console.log("check label box");

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  goToSingilEntityReport(id) {
    console.log("clicked", id);
    this.router.navigate(['/report/block-list/'], { queryParams: { programId: this.programId, Id: id  , solutionId : this.solutionId} });
  }

  getAction(actionFor, blockName, schoolId?: any) {
    if (actionFor === 'multiEntity') {
      const schoolArray = []
      for (const item of this.selection.selected) {
        schoolArray.push(item._id);
      }
      for (const link of this.link[actionFor]) {
        link.queryParams.school = Object.assign([], schoolArray);
        link.queryParams.blockName = this.blockData.label;
        link.queryParams.solutionId = this.solutionId;
        // console.log(blockName)

      }
    } else {
      for (const link of this.link[actionFor]) {
        link.params = schoolId;
        link.queryParams.solutionId = this.solutionId;

      }
    }
    this.bottomSheet.open(ActionSheetComponent, { data: this.link[actionFor] })
  }


  toggleRow(row) {
    let flag = false;
    if(this.selection.selected.length > 0){
      this.selection.selected.forEach(selectedRow => {
        if( row.externalId === selectedRow.externalId){
          flag = true;
        }
      });
      if (this.selection.selected.length < this.limitSelection+1 || flag) {
        this.selection.toggle(row);
           row.selected =  flag ? false : true;

      }
      else{
        this.showMessage();
      }
      
    }
    
    else{
      this.selection.toggle(row);
      row.selected = true
    }
    this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;
  }
 
  getSchoolList(id) {
    this.dataSource = new MatTableDataSource();
    this.reportService.getListOfSchool(this.solutionId, id)
      .subscribe(data => {
        this.paginator.pageIndex = 0;
        data['result']['entities'].forEach((element,index) => {
        Object.assign(data['result']['entities'][index], {'selected' : false} )
        });
        this.dataSource = new MatTableDataSource(data['result']['entities']);
        this.selection = new SelectionModel(true, []);
        this.paginator.pageSize = 5;
        this.paginator.pageIndex = 0;
        this.paginator.length = data['result']['entities'].length;
        this.dataSource.paginator = this.paginator;
      },
        (error) => {
          //this.snackBar.open(GlobalConfig.errorMessage, "OK", { duration: 9000 })
          this.utility.loaderHide();
          ;
        }
      );

  }
  showMessage() {
    let limit = this.limitSelection+1;
    this.snackBar.open("Maximum "+limit + " can be selected.", "OK", { duration: 2000 })
  }
}





