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
  constructor(private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private utility: UtilityService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
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
    const numSelected = this.selection ? this.selection.selected.length : 0;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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
    this.bottomSheet.open(ActionSheetComponent, { data: this.link[actionFor] })
  }


  toggleRow(row) {
    this.selection.toggle(row);
    this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;
  }

  getSchoolList(id) {
    this.dataSource = new MatTableDataSource();
    this.reportService.getListOfSchool(this.programId, id)
      .subscribe(data => {
        this.paginator.pageIndex = 0;
        this.dataSource = new MatTableDataSource(data['result']['schools']);
        this.selection = new SelectionModel(true, []);
        this.paginator.pageSize = 5;
        this.paginator.pageIndex = 0;
        this.paginator.length = data['result']['schools'].length;
        this.dataSource.paginator = this.paginator;
      },
        (error) => {
          this.snackBar.open(GlobalConfig.errorMessage, "OK", { duration: 9000 })
          this.utility.loaderHide();
          ;
        }
      );

  }
}





