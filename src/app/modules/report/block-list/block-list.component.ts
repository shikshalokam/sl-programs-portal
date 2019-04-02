import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { ReportService } from '../report-service/report.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from 'src/app/global-config';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  displayedColumns: string[]= ['select','externalId','name','city'];
  blocks;
  result;
  dataSource;
  blockList;
  schoolList;
  smallScreen = false;
  programId;
  blockId;
  error: any;
  selection: any;
  numSelected;
  numRows;
  selected;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  router: any;
  snackBar: any;

  constructor(private route: ActivatedRoute ,private reportService: ReportService,private utility: UtilityService) { 
    this.route.queryParams.subscribe(params => {
      this.programId = params["ProgramId"];
    });
    this.showConfig();
    this.blockClick(this.blockId);
  }

  ngOnInit() {
  }

  onResize(event){
    if(event.target.innerWidth < 760){
      this.smallScreen = true;
    }
    else{
      this.smallScreen = false;
    }
  }


  showConfig(){
    this.reportService.getListOfBlock(this.programId)
    .subscribe(data => {
      this.result = data['result']['zones']['length'];
      this.dataSource = new MatTableDataSource(data['result']['zones']);
      setTimeout(() => this.dataSource.sort = this.sort);
      this.blockList = data['result']['zones'];
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
        this.utility.loaderHide();
        ;
      }
    );
  }

  showSchool(){
    this.reportService.getListOfSchool(this.programId, this.blockId)
    .subscribe(data => {
      this.result = data['result']['schools']['length'];
      this.dataSource = new MatTableDataSource(data['result']['schools']);
      this.selection = new SelectionModel(true, []);
      setTimeout(() => this.dataSource.sort = this.sort);
      this.utility.loaderHide()
    },
      (error) => {
        this.error = error;
        this.snackBar.open(GlobalConfig.errorMessage, "OK", {duration: 9000})
        this.utility.loaderHide();
        ;
      }
    );

  }

  blockClick(id){
    this.blockId = id;
    this.showSchool();
  }

  isAllSelected() {
     this.numSelected = this.selection.selected.length;
     this.numRows = this.dataSource.data.length;
    return this.numSelected === this.numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

  
  



