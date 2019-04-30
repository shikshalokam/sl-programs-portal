import { Injectable } from '@angular/core';
import { ApiService } from 'shikshalokam';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(
    private apiService : ApiService
  ) { }
  uploadCsv(csv,uploadType){
    let restUrl='';
    if(uploadType = "addUser"){

    }
    else if(uploadType = "addHierarchy"){

    }
    return this.apiService.upload(environment.apibaseurl+restUrl,csv,uploadType);
  }
}
