import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationsService } from '../operations-service/operations.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { UtilityService } from 'shikshalokam';
import { getToken } from '@angular/router/src/utils/preactivation';
@Component({
  selector: 'app-ops-report',
  templateUrl: './ops-report.component.html',
  styleUrls: ['./ops-report.component.scss']
})
export class OpsReportComponent implements OnInit {
  reportGenerate = false;
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
  filterArray: [string, {}][];
  schoolReport: Object;
  itemsPerPage=[1,2,3];
  searchParam: string = '';
  assessorReport: any;
  summaryData: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private operationService:OperationsService,
    private utility :UtilityService
  ) {
    this.filterForm = this._fb.group({
      formDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params =>{
      this.filters(params['ProgramId']);
      this.getUserSummary(params['ProgramId']);

    })
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserDetails();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
  this.filterObject= this.filterForm.getRawValue();
  for (let filter in this.filterObject) { 
    

    if (this.filterObject[filter] === null || this.filterObject[filter] === undefined || this.filterObject[filter] === "" || this.filterObject[filter] === "aN-aN-NaN")  {
      delete this.filterObject[filter];
    }
  }
 if(this.filterObject.formDate){
  this.filterObject['fromDate']= this.applyDate(this.filterObject.fromDate);
  this.filterObject['toDate']= this.applyDate(this.filterObject.toDate);
 }
  this.applyFilter(this.filterObject)
  this.filterArray = Object.entries(this.filterObject)
  // this.filterArray = Object.keys(this.filterObject).map(i => this.filterObject[i])
  this.buildqueryParams();
  }
  buildqueryParams(){

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
    const index = this.filterArray.indexOf(filter);

    if (index >= 0) {
      this.filterArray.splice(index, 1);
    }
  }
  mapGraphObject(object) {
    
    for(let i = 0;i< object.graphData.length;i++)
     {
       const dataArray = this.getData(object,i)
      Object.assign(object.graphData[i], {
        data : dataArray 
      })
      Object.assign(object.graphData[i].chartOptions,{legend: { position: 'top', alignment: 'end' }})

    }
    object.graphData.forEach((item,index )=> {
      if(object.graphData[index].data.length > 2 && object.graphData[index].chartType ==='ColumnChart'){
        Object.assign(object.graphData[index].chartOptions,{isStack:true})
      }
    });
    
    const headers= this.getTableHeader(object);
    Object.assign(object,{tableHeader:headers})
    return object;
  }
  getTableHeader(object){
    let headingArray = []
    object.tabularData.headers.forEach(header =>{
      headingArray.push(header.name);
    })
    return headingArray;
  }
  getData(object , i){
      let dataArray=[];
      for(let j = 0 ; j <object.data.length;j++)
    { 
      let columnArray = this.getColumn(object,i,j);
        dataArray.push( columnArray ); 
      }
      return dataArray;
  }
  getColumn(object,i,j){
      let colArray = [];
    object.graphData[i].columnNames.forEach(column => {
        colArray.push(object.data[j][column]);
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
    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams: obj, queryParamsHandling: "merge",
      preserveFragment: true
    });
    this.route.queryParams.subscribe(params => {
    });
    this.generateReport();
  }

  inputChange(key, event) {
    this.applyFilter({ [key]: event.target.value });
    if(key == 'schoolId'){
      this.searchSchoolId = event.target.value;
    }
  }
  selectType(key, value) {
    this.applyFilter({ [key]: value })

  }
  generateReport() {
    let param;
    this.route.queryParams.subscribe(params => {
      param = params
    });

    this.queryParamsUrl = param['ProgramId'] + "?";
    let paramKey = Object.keys(param);
    paramKey = paramKey.slice(1)
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
    this.queryParamsUrl+='csv='+false;
      this.searchParam = this.setSearchParam();
      
    this.reportsDataFetch();
    this.reportGenerate = true;
  }
  setSearchParam(index: number = 1 , size : number = this.itemsPerPage[0] ){
    const  url ='&page='+index+'&limit='+size+'&schoolName='+this.searchSchoolValue+'&assessorName='+this.searchAssessorName;
    return url;
  }
  pageResponse(event) {
   this.searchParam= this.setSearchParam(event.pageIndex + 1 , event.pageLimit);
    this.getSchoolReport();
  }
  reportsDataFetch(){
   this.getSchoolReport();
   this.getAssessorReport();
  }

  filters(url){
    this.operationService.applyFilters(url).subscribe( data => {

      this.filterData = data['result'];

     this.filterForm= this.utility.toGroup(data['result']);

    });
  }
  getUserSummary(url){
    this.operationService.getUserSummary(url).subscribe( data => {
      this.summaryData=data['result'];
      console.log(this.summaryData)
    });
  }
  getSchoolReport(){
    this.operationService.getSchoolReport(this.queryParamsUrl+this.searchParam).subscribe( data => {
       this.schoolReport = this.mapGraphObject(data['result']['sections'][0]);
       this.schoolGraph=this.schoolReport['graphData'];
      
    });
  }

  getAssessorReport(){
    this.operationService.getAssessorReport(this.queryParamsUrl+this.searchParam).subscribe( data => {
      this.assessorReport = this.mapGraphObject(data['result']['sections'][0]);
       this.assessorGraph=this.assessorReport['graphData'];
    });
  }
  searchSchoolIdInApi(searchId){
  }
  searchVal(id,searchValue){
    if(id == 'school')
     { 
       this.searchSchoolValue = searchValue;
     }
     else if(id == 'assessor'){
       this.searchAssessorName = searchValue;
     }
  }
  searchInApi(){
    this.searchParam=this.setSearchParam();
    this.getSchoolReport();
    this.getAssessorReport();
  }
}
