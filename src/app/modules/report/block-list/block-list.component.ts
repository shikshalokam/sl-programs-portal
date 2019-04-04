import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConfig } from 'src/app/global-config';
import { SelectionModel } from '@angular/cdk/collections';
import { MatBottomSheet } from '@angular/material';
import { ActionSheetComponent } from '../action-sheet/action-sheet.component';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit {
  object = Object;
  displayedColumns: string[] = ['select', 'name', 'city', 'actions'];
  columnsForBlockTable: string[] = ["labels", "action"];
  expandedElement;
  blocks;
  dataSource;
  blockList;
  schoolList;
  programId;
  blockId;
  error: any;
  selection;
  numSelected;
  numRows;
  arr = [];
  enableMultiSchool: boolean = false;
  blockListDataSource;
  links = {};



  selectedZoneIndex = -1;

  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  snackBar: any;
  data: any;

  constructor(private bottomSheet: MatBottomSheet, private route: ActivatedRoute, private reportService: ReportService, private utility: UtilityService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
      this.links = {
        multiEntity: [
          {
            label: "Drilldown Report",
            link: "/report/entity-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              school: ""
            }
          },
          {
            label: "Highlevel Report",
            link: "/report/multiple-entity-report",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              school: ""
            }
          }
        ],
        singleEntity: [
          {
            label: "Drilldown Report",
            link: "/report/entity-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              // school:""
            }
          },
          {
            label: "Highlevel Report",
            link: "/report/highlevel-entity-report/",
            params: "",
            queryParams: {
              ProgramId: this.programId,
              // school:""
            }
          }
        ]
      };
    });
    // this.blockClick(this.blockId);
  }

  ngOnInit() {
    this.getAllBlocks();
  }


  getAllBlocks() {
    this.utility.loaderShow();
    this.reportService.getListOfBlock(this.programId)
      .subscribe(data => {
        this.blockList = data['result']['zones'];
        this.blockListDataSource = data['result']['zones']
        this.utility.loaderHide()
      },
        (error) => {
          this.error = error;
          this.snackBar.open(GlobalConfig.errorMessage, "OK", { duration: 9000 })
          this.utility.loaderHide();
          ;
        }
      );
  }

  toggleRow(row) {
    this.selection.toggle(row);
    this.enableMultiSchool = this.selection.selected.length > 1 ? true : false;
  }

  getSchoolList(id) {
    // this.utility.loaderShow();
    this.dataSource = new MatTableDataSource();
    this.reportService.getListOfSchool(this.programId, id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data['result']['schools']);
        this.paginator.pageSize = 5;
        this.paginator.pageIndex = 0;
        this.paginator.length = data['result']['schools'].length;
        // console.log(this.paginator)
        this.dataSource.paginator = this.paginator;
        this.selection = new SelectionModel(true, []);
      },
        (error) => {
          this.error = error;
          // this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
          this.utility.loaderHide();
          ;
        }
      );

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

  getAction(actionFor, schoolId?: any) {
    if (actionFor === 'multiEntity') {
      const schoolArray = []
      for (const item of this.selection.selected) {
        schoolArray.push(item._id);
      }
      for (const link of this.links[actionFor]) {
        link.queryParams.school = Object.assign([], schoolArray);
      }
    } else {
      for (const link of this.links[actionFor]) {
        link.params = schoolId;
      }
    }

    console.log(this.links[actionFor]);
    this.bottomSheet.open(ActionSheetComponent, { data: this.links[actionFor] })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}






