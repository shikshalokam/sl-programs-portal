import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProgramsDashboardConfig } from 'src/app/modules/programs-dashboard/programs-dashboard-config';
import { ApiService } from 'shikshalokam';

@Injectable({
  providedIn: 'root'
})
export class ProgramsDashboardService {

  constructor( private apiService: ApiService) { }
  
  getProgramList() {
    return this.apiService.get(environment.apibaseurl + ProgramsDashboardConfig.programList);
  }
}
