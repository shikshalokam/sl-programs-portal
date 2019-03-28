import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportConfig } from 'src/app/modules/report/report-config';
import { ApiService } from 'shikshalokam';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private apiService: ApiService) { }
  downloadReport(evedinceId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.downloadReport + evedinceId);
  }
  getSchoolList() {
    return this.apiService.get(environment.apibaseurl + ReportConfig.schoolListFind);
  }
  getListOfSchool(programId){
    return this.apiService.get(environment.apibaseurl + ReportConfig.listOfSchool + programId);
  }
  getListOfBlock(programId){
    return this.apiService.get(environment.apibaseurl + ReportConfig.listOfBlock + programId);
  }
  getEcmReportGetSubmissionId(schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.ecmReportGetSubmissionId + schoolId)
  }
  getSubmissionReport(submissionId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.GetSubmission + submissionId)
  }
}
