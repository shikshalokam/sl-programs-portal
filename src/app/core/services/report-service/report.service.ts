import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReportConfig } from 'src/app/modules/report/report-config';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private http: HttpClient) { }
  downloadReport(evedinceId) {
    return this.http.get(environment.apibaseurl + ReportConfig.downloadReport + evedinceId);
  }
  getSchoolList() {
    return this.http.get(environment.apibaseurl + ReportConfig.schoolListFind);
  }
  getEcmReportGetSubmissionId(schoolId) {
    return this.http.get(environment.apibaseurl + ReportConfig.ecmReportGetSubmissionId + schoolId)
  }
  getSubmissionReport(submissionId) {
    return this.http.get(environment.apibaseurl + ReportConfig.GetSubmission + submissionId)
  }
}
