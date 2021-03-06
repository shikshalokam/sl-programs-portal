import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportConfig } from 'src/app/modules/report/report-config';
import { ApiService } from 'shikshalokam';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService) { }
  downloadReport(evedinceId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.downloadReport + evedinceId);
  }
  getSchoolList(programId,solutionId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.schoolListFind+"?type=assessment&subType=institutional&programId="+programId+"&solutionId="+solutionId);
  }

  getListOfBlock(programId){
    return this.apiService.get(environment.apibaseurl + ReportConfig.listOfBlock + programId);
  }

  getListOfSchool(programId, Id){
    return this.apiService.get(environment.apibaseurl + ReportConfig.listOfSchool + programId + '&blockId=' + Id);
  }
 


  getEcmReportGetSubmissionId(programId,solutionId,schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.ecmReportGetSubmissionId + programId+"?solutionId="+solutionId+"&entityId="+ schoolId)
  }
  getSubmissionReport(submissionId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.GetSubmission + submissionId)
  }
  getUserSchoolsInProgram(programId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.userSchoolsInProgram + programId);
  }

  getSingleEntityReport(programId, schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.singleEntityReport + programId + '?school=' + schoolId);
    // return this.apiService.get('/assests/insight.json');

  }
  getHighEntityReport(programId, schoolId) {
    return this.apiService.get(environment.apibaseurl + ReportConfig.highEntityReport + programId + '?school=' + schoolId);
    // return this.apiService.get('/assests/insight.json');
  }
  getFrameWorkStructureRubric(url) {
    return this.apiService.get(environment.apibaseurl + url)
  }
  getMultipleEntityReport(programId,blockName, ...schoolId) {
    let url = '';
    schoolId.forEach((Id, index) => {
      if (index === 0) {
        url += schoolId[index];
      }
      else {
        url += "," + schoolId[index];
      }

    });
    return this.apiService.get(environment.apibaseurl + ReportConfig.multiEntityHighLevelReport + programId + '?school=' + url +'&blockName='+blockName);
    // return this.apiService.get('/assests/insight.json');
  }

  getMultipleEntityDrilldownReport(programId,blockName, ...schoolId) {
    let url = '';
    schoolId.forEach((Id, index) => {
      if (index === 0) {
        url += schoolId[index];
      }
      else {
        url += "," + schoolId[index];
      }

    });
    return this.apiService.get(environment.apibaseurl + ReportConfig.multiEntityDrillDownLevelReport + programId + '?school=' + url+'&blockName='+blockName);
    // return this.apiService.get('/assests/insight.json');
  }
}
