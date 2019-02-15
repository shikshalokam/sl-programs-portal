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
  getSchools(programId,componentId,search,pageIndex,pageSize){
    if(pageIndex === undefined){
      pageIndex = 1;
      pageSize = 4;
    }
    pageIndex++;
    return this.http.get(environment.apibaseurl + OperationConfig.viewSchools+"programId="+programId+"&componentId="+componentId+"&search="+search+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
  }

}