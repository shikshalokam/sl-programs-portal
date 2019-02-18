import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationConfig } from 'src/app/modules/operations/operations.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
   Url;

  constructor(private http: HttpClient) { }
  uploadCsv(csvFile,uploadType,programId,componentId) {
    if(uploadType == 'schools')
    {
      this.Url=OperationConfig.uploadSchool;
    }
    else if(uploadType =='assessors')
    {
      this.Url=OperationConfig.uploadAcessors;
    }
    return this.http.post(environment.apibaseurl + this.Url+"programId="+programId+"&componentId="+componentId, csvFile , {reportProgress: true, observe: 'events'});
  }
  // getSchools(programId,componentId,search,pageIndex,pageSize){
  getSchools(...args){
    console.log(args)
    if(args[3] === undefined){
      args[3] = 0;
      args[4] = 50;
    }
    args[3]++;
    return this.http.get(environment.apibaseurl + OperationConfig.viewSchools+"programId="+args[0]+"&componentId="+args[1]+"&search="+args[2]+"&pageIndex="+args[3]+"&pageSize="+args[4]);
  }

}