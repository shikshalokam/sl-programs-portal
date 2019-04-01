import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationConfig } from 'src/app/modules/operations/operations.config';
import { environment } from 'src/environments/environment';
import { ApiService } from 'shikshalokam';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
   Url;

  constructor(private apiService :ApiService) { }
  uploadCsv(csvFile,uploadType,programId,componentId) {
    if(uploadType == 'schools')
    {
      this.Url=OperationConfig.uploadSchool;
    }
    else if(uploadType =='assessors')
    {
      this.Url=OperationConfig.uploadAcessors;
    }
    return this.apiService.upload(environment.apibaseurl + this.Url+"programId="+programId+"&componentId="+componentId, csvFile  , uploadType);
  }
  // getSchools(programId,componentId,search,pageIndex,pageSize){
  getSchools(...args){
    if(args[3] === undefined){
      args[3] = 0;
      args[4] = 50;
    }
    args[3]++;
    return this.apiService.get(environment.apibaseurl + OperationConfig.viewSchools+"programId="+args[0]+"&componentId="+args[1]+"&search="+args[2]+"&page="+args[3]+"&limit="+args[4]);
  }

  getAssessors(...args){
    if(args[3] === undefined){
      args[3] = 0;
      args[4] = 50;
    }
    args[3]++;
    return this.apiService.get(environment.apibaseurl + OperationConfig.viewAssessors+"programId="+args[0]+"&componentId="+args[1]+"&search="+args[2]+"&page="+args[3]+"&limit="+args[4]);
  }
  getSummary(url){
    return this.apiService.get("http://localhost:4201"+ OperationConfig.reportSummary + url);
  }
  applyFilters(url){

    return this.apiService.get(environment.apibaseurl + OperationConfig.reportFilter+url);
  }
  getUserSummary(url){

    return this.apiService.get(environment.apibaseurl + OperationConfig.reportSummary+url);
  }
  getSchoolReport(url){

    return this.apiService.get(environment.apibaseurl + OperationConfig.schoolReport+url);
  }
  getAssessorReport(url){

    return this.apiService.get(environment.apibaseurl + OperationConfig.assessorReport+url);
  }
  // applyFilters(url){
    
  //   return this.apiService.get("http://localhost:4201/assessment/api/v1/" + OperationConfig.reportFilter+url);
  // }
  // getUserSummary(url){

  //   return this.apiService.get("http://localhost:4201/" + OperationConfig.reportSummary+url);
  // }
  // getSchoolReport(url){

  //   return this.apiService.get("http://localhost:4201/" + OperationConfig.schoolReport+url);
  // }
  // getAssessorReport(url){

  //   return this.apiService.get("http://localhost:4201/" + OperationConfig.assessorReport+url);
  // }

  getUserProfileSummary(programId){
    return this.apiService.get(environment.apibaseurl + OperationConfig.profileSummary+programId);
  }
}