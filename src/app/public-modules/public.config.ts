import { environment } from "src/environments/environment";

export const PublicConfig = {
    schoolReport: 'programOperations/schoolReport/',
    assessorReport: 'programOperations/assessorReport/',
    reportSummary: 'programOperations/schoolSummary/',
    reportFilter: 'programOperations/reportFilters/',
    profileSummary: 'programOperations/managerProfile/',
    userSchoolsInProgram: "programs/userSchoolList?programId=",
    singleEntityReport: "insights/singleEntityDrillDownReport/",
    highEntityReport: "insights/singleEntityHighLevelReport/",
    multiEntityHighLevelReport: "insights/multiEntityHighLevelReport/",
    multiEntityDrillDownLevelReport: "insights/multiEntityDrillDownReport/",
    shareLinkApi: environment.apibaseurl + "sharedLinks/generate",
    publicSharedBaseUrl: "http://localhost:4200/public/",
    errorMessage: "Some thing went Wrong..",
    verifyLinkId : environment.apibaseurl + "sharedLinks/verify"
}
