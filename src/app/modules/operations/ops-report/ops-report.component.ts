import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from '../operations-service/operations.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UtilityService, CamelCasePipe } from 'shikshalokam';
import { MatAccordion, MatSnackBar } from '@angular/material';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { GlobalConfig } from 'src/app/global-config';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ops-report',
  templateUrl: './ops-report.component.html',
  styleUrls: ['./ops-report.component.scss']
})
export class OpsReportComponent implements OnInit {
  reportGenerate = false;
  schoolPageIndex = 0;
  assessorPageIndex = 0;
  schoolGraph;
  assessorGraph;

  headings = 'headings.opsReport'
  currentUser;
  dynamicResize;
  columnNames;
  searchSchoolId;
  filterData;
  maxDate = new Date();
  filterForm: FormGroup;
  queryParamsUrl = '';
  searchSchoolValue: string = '';
  searchAssessorName: string = '';
  filterObject: any;
  filterArray;
  schoolReport: Object;
  itemsPerPage = [10, 15, 20];
  searchParam: string = '';
  assessorReport: any;
  summaryData: any;
  pageParam: any;
  pageReload = true;
  summaryGraph: object = {};
  schoolPageLimit: any = 10;
  assessorPageLimit: any = 10;
  expandedFilters: boolean = true;
  schoolLoading: boolean;
  assessorLoading: boolean;
  hostUrl;
  @ViewChild('myaccordion') filterPanel: MatAccordion;
  summaryProfileData: any;
  currentRouterUrl: string = '';
  queryParamsRouterUrl: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private operationService: OperationsService,
    private utility: UtilityService,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this._fb.group({
      formDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });

  }
  pdf(id) {
    var data = document.getElementById(id);
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(id + '.pdf');
    });

  }
  ngOnInit() {
    this.currentRouterUrl = window.location.href;
    this.hostUrl = environment.base_url;
    this.currentUser = this.authService.getCurrentUserDetails();
    this.route.queryParams.subscribe(params => {
      this.pageParam = params;
      //console.logparams)
      this.utility.loaderShow();
      this.filters(params['ProgramId']);
      this.getUserProfile(params['ProgramId']);

      if (this.pageReload) {
        //  this.getUserSummary(params['ProgramId']);
        if (Object.keys(params).length > 1) {
          //console.log"api twice")
          let param = Object.assign({}, params);

          console.log(param)
          delete param['ProgramId'];
          console.log(param)

          this.applyFilter(param);
          this.expandedFilters = false;
          this.reportGenerate = true;
        }
        this.pageReload = false;

      }

    })
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  filterApply(condition) {
    //console.logcondition)
    if (condition === 'reset') {
      this.filterForm.reset();
      // this.router.navigate(['/operations/reports'], { queryParams: { ProgramId: this.pageParam['ProgramId'] } });
      this.reportGenerate = false;
      this.filterArray = [];
      this.route.queryParams.subscribe(params => {
        let resetUrl = '/operations/reports?ProgramId=' + params['ProgramId']
        window.history.pushState({ path: resetUrl }, '', resetUrl);

      })
    }
    else {
      // this.filterPanel.closeAll();
      this.pageReload = false;
      this.expandedFilters = !this.expandedFilters;
      this.filterObject = this.filterForm.getRawValue();
      for (let filter in this.filterObject) {
        if (this.filterObject[filter] === null || this.filterObject[filter] === undefined || this.filterObject[filter] === "" || this.filterObject[filter] === "aN-aN-NaN") {
          delete this.filterObject[filter];
        }
      }
      if (this.filterObject.toDate) {
        // this.filterObject['fromDate']= this.applyDate(this.filterObject.fromDate)
        this.filterObject['toDate'] = this.applyDate(this.filterObject.toDate);

      }
      if (this.filterObject.fromDate) {
        this.filterObject['fromDate'] = this.applyDate(this.filterObject.fromDate);
        // this.filterObject['toDate']= this.applyDate(this.filterObject.toDate);

      }
      this.applyFilter(this.filterObject)
      this.filterArray = Object.entries(this.filterObject)
      // this.filterArray = Object.keys(this.filterObject).map(i => this.filterObject[i])
      // this.buildqueryParams();
      // this.reportsDataFetch();

    }
  }
  buildqueryParams() {

  }
  prevStep() {
    this.step--;
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  remove(filter): void {
    let param;
    const index = this.filterArray.indexOf(filter);
    this.route.queryParams.subscribe(params => {
      param = params;
      // delete param['ProgramId'];
      // this.generateReport(param);
    })
    if (index >= 0) {
      this.filterArray.splice(index, 1);
    }


  }
  mapGraphObject(data) {
    data.forEach((object, ind) => {
      for (let i = 0; i < object.graphData.length; i++) {

        const dataArray = this.getData(object, i)
        Object.assign(data[ind].graphData[i], {
          data: dataArray
        })
        Object.assign(data[ind].graphData[i].chartOptions, { legend: { position: 'top', alignment: 'end' } })

      }
      object.graphData.forEach((item, index) => {

        if (object.graphData[index].data.length > 2 && object.graphData[index].chartType === 'ColumnChart') {
          Object.assign(data[ind].graphData[index].chartOptions, {
            isStack: true,
          })
        }

        if (data[ind].graphData[index].data.length > 10) {
          Object.assign(data[ind].graphData[index].chartOptions.hAxis, { textPosition: 'none' });
        }
        let colNameArray = []
        data[ind].graphData[index].columnNames.forEach(column => {
          colNameArray.push(new CamelCasePipe().transform(column));
        });
        Object.assign(data[ind].graphData[index], { columnNames: colNameArray });


      });

      new CamelCasePipe().transform('schoolList')
      const headers = this.getTableHeader(object);
      Object.assign(data[ind], { tableHeader: headers })
    });
    ////console.logdata)
    return data;

  }
  getTableHeader(object) {
    let headingArray = []
    object.tabularData.headers.forEach(header => {
      headingArray.push(header.name);
    })
    return headingArray;
  }
  getData(object, i) {
    let dataArray = [];
    for (let j = 0; j < object.data.length; j++) {
      let columnArray = this.getColumn(object, i, j);
      dataArray.push(columnArray);
    }
    return dataArray;
  }
  getUserProfile(ProgramId) {
    this.operationService.getUserProfileSummary(ProgramId).subscribe(data => {
      ////console.logdata);
      this.summaryProfileData = data['result'];
      const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      this.summaryProfileData = arrayToObject(this.summaryProfileData, "label")
    },
      error => {

        this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });

      });
  }
  getColumn(object, i, j) {
    let colArray = [];
    object.graphData[i].columnNames.forEach((column, index) => {
      column = column.trim();
      if (index > 0) {
        if (object.data[j][column] === "") {

          colArray.push(0);
        }
        else {
          colArray.push(object.data[j][column]);
        }
      }
      else {
        colArray.push(object.data[j][column]);
      }

    }
    );
    return colArray;
  }
  applyDate(value) {
    var date = new Date(value),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const val = [day, mnth, date.getFullYear()].join("-");
    return val;
  }

  applyFilter(obj) {
    // this.router.navigate([], {
    //   relativeTo: this.route, queryParams: obj, queryParamsHandling: "merge",
    //   preserveFragment: true
    // });
    let paramKey = Object.keys(obj);
    let queryParamKey = Object.keys(this.pageParam);
    let ifIndex = 0;
    let elseIndex = 0;
    this.queryParamsRouterUrl = '';
    paramKey.forEach(element => {
      if (!this.pageReload) {
        if (element !== 'ProgramId') {
          //console.log);
          if (ifIndex == 0) {
            this.queryParamsRouterUrl += element + '=' + obj[element]
          }
          else {
            this.queryParamsRouterUrl += '&' + element + '=' + obj[element]
          }
          ifIndex++;
        }
      } else {
        if (queryParamKey.includes(element) && element !== 'ProgramId') {

          console.log("test")
          if (elseIndex == 0) {
            this.queryParamsRouterUrl += element + '=' + obj[element]
          }
          else {
            this.queryParamsRouterUrl += '&' + element + '=' + obj[element]
          }
          elseIndex++
        }
      }

    })

    //console.logthis.queryParamsRouterUrl)
    let addQueryParamUlr = '/operations/reports?ProgramId=' + this.pageParam['ProgramId'] + "&" + this.queryParamsRouterUrl;
    //console.logaddQueryParamUlr)

    window.history.pushState({ path: addQueryParamUlr }, '', addQueryParamUlr);
    let param;
    this.route.queryParams.subscribe(params => {
      param = params;
      //console.logparams)
    });


    this.generateReport(obj);

  }

  inputChange(key, event) {
    this.applyFilter({ [key]: event.target.value });
    if (key == 'schoolId') {
      this.searchSchoolId = event.target.value;
    }
  }
  selectType(key, value) {
    this.applyFilter({ [key]: value })

  }
  generateReport(param) {
    // let param;
    // this.route.queryParams.subscribe(params => {
    //   param = params
    // });
    //console.logparam)
    this.queryParamsUrl = this.pageParam['ProgramId'] + "?";
    let paramKey = Object.keys(param);
    // paramKey = paramKey.slice(1)
    let index = 0;
    paramKey.forEach(element => {
      if (index == 0) {
        this.queryParamsUrl += element + '=' + param[element]
      }
      else {
        this.queryParamsUrl += '&' + element + '=' + param[element]
      }
      index++;
    })
    // this.queryParamsUrl += '&csv=' + false;
    //console.logthis.queryParamsUrl)
    this.reportGenerate = true;
    this.reportsDataFetch();

  }
  downloadCsv(id) {
    if (id === 'school') {
      this.operationService.getSchoolReport(this.pageParam['ProgramId'] + "?csv=" + true).subscribe(data => {

      },
        error => {
          if (error.status == 200) {
            const blob = new Blob([error.error.text], { type: 'csv' });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${id}-Report.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          } else {
            this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
          }
        });
    }
    else if (id === 'assessor') {
      this.operationService.getAssessorReport(this.pageParam['ProgramId'] + "?csv=" + true).subscribe(data => {

      },
        error => {
          ////console.logerror.status)
          if (error.status == 200) {
            const blob = new Blob([error.error.text], { type: 'csv' });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `${id}-Report.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          } else {
            this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
          }
        });

    }

  }
  setSearchParam(index: number = 1, size: number = this.itemsPerPage[0], label) {
    if (label === 'school') {

      const url = '&page=' + index + '&limit=' + size + '&schoolName=' + this.searchSchoolValue;
      return url;
    }
    else if (label === 'assessor') {
      const url = '&page=' + index + '&limit=' + size + '&assessorName=' + this.searchAssessorName;
      return url;
    }

  }
  pageResponse(event) {
    if (event.label === 'school') {
      this.schoolPageLimit = event.pageLimit;
      this.schoolPageIndex = event.pageIndex;
      this.searchParam = this.setSearchParam(this.schoolPageIndex + 1, this.schoolPageLimit, 'school');
      this.getSchoolReport();
    }

    else if (event.label === 'assessor') {
      this.assessorPageIndex = event.pageIndex;
      this.assessorPageLimit = event.pageLimit;
      this.searchParam = this.setSearchParam(this.assessorPageIndex + 1, this.assessorPageLimit, 'assessor');
      this.getAssessorReport();
    }



  }
  reportsDataFetch() {
    //console.log"api called")

    this.utility.loaderShow();
    this.getUserSummary(this.queryParamsUrl);
    this.searchParam = this.setSearchParam(this.schoolPageIndex + 1, this.schoolPageLimit, 'school');
    this.getSchoolReport();
    this.searchParam = this.setSearchParam(this.assessorPageIndex + 1, this.assessorPageLimit, 'assessor');

    this.getAssessorReport();
  }

  filters(url) {

    this.operationService.applyFilters(url).subscribe(data => {

      this.filterData = this.mapQueryParams(data['result']);
      this.filterForm = this.utility.toGroup(this.filterData);
      ////console.logthis.filterForm)
      this.filterObject = this.filterForm.getRawValue()
      for (let filter in this.filterObject) {
        if (this.filterObject[filter] === null || this.filterObject[filter] === undefined || this.filterObject[filter] === "" || this.filterObject[filter] === "aN-aN-NaN") {
          delete this.filterObject[filter];
        }
      }
      this.filterArray = Object.entries(this.filterObject);
      this.utility.loaderHide();
    },
      error => {
        this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
      });
  }
  mapQueryParams(data) {
    let param;
    this.route.queryParams.subscribe(params => {
      param = params;
    })
    let paramKey = Object.keys(param);
    paramKey.forEach(paramLabel => {
      data.forEach((element, index) => {
        ////console.logparamLabel)
        if (element.field === paramLabel) {
          if (element.input === 'date') {
            let date = [param[paramLabel].substring(6), param[paramLabel].substring(3, 5), param[paramLabel].substring(0, 2)].join("-");
            data[index].value = date + 'T00:00:00.000Z';
          }
          else {
            data[index].value = param[paramLabel];

          }
        }
      });
    });
    ////console.logdata)
    return data;
  }
  getUserSummary(url) {
    this.operationService.getUserSummary(url).subscribe(data => {
      this.summaryData = data['result'];

      const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      this.summaryData = arrayToObject(this.summaryData, "label")

      this.utility.loaderHide();
    },
      error => {
        this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
      }
    );
  }
  getSchoolReport() {
    this.schoolLoading = true;
    this.operationService.getSchoolReport(this.queryParamsUrl + this.searchParam).subscribe(data => {
      this.schoolReport = this.mapGraphObject(data['result']['sections']);
      //  this.schoolGraph=this.schoolReport['graphData'];
      this.schoolLoading = false;

    }, error => {
      this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
    }
    );
  }

  getAssessorReport() {
    this.assessorLoading = true;
    this.operationService.getAssessorReport(this.queryParamsUrl + this.searchParam).subscribe(data => {
      this.assessorReport = this.mapGraphObject(data['result']['sections']);
      //  this.assessorGraph=this.assessorReport['graphData'];
      this.assessorLoading = false;

    }, error => {
      this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
    }
    );
  }
  searchSchoolIdInApi(searchId) {
  }
  searchVal(id, searchValue) {
    if (id == 'school') {
      this.searchSchoolValue = searchValue;
    }
    else if (id == 'assessor') {
      this.searchAssessorName = searchValue;
    }
  }
  searchInApi(label) {
    if (label === 'school') {
      this.schoolPageIndex = 1;
      this.searchParam = this.setSearchParam(this.schoolPageIndex, this.schoolPageLimit, 'school');
      this.getSchoolReport();
    }
    else if (label === 'assessor') {
      this.assessorPageIndex = 1;
      this.searchParam = this.setSearchParam(this.assessorPageIndex, this.assessorPageLimit, 'assessor');
      this.getAssessorReport();
    }

  }
}
