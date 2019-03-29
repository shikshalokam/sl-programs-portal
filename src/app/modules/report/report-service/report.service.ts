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
  getEcmReportGetSubmissionId(schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.ecmReportGetSubmissionId + schoolId)
  }
  getSubmissionReport(submissionId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.GetSubmission + submissionId)
  }
  getUserSchoolsInProgram(programId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.userSchoolsInProgram+programId);
  }

  getSingleEntityReport(programId, schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.singleEntityReport+programId + '?school=' + schoolId);
    // return this.apiService.get('/assests/insight.json');

  }
}
