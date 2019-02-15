import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProgramsDashboardConfig } from 'src/app/modules/programs-dashboard/programs-dashboard-config';

@Injectable({
  providedIn: 'root'
})
export class ProgramsDashboardService {

  constructor( private http: HttpClient) { }
  
  getProgramList() {
    return this.http.get(environment.apibaseurl + ProgramsDashboardConfig.programList);
  }
}
