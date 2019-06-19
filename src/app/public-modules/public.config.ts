import { environment } from "src/environments/environment";

export const PublicConfig = {
    userSchoolsInProgram: "programs/userSchoolList?programId=",
    singleEntityReport: "insights/singleEntityDrillDownReport/",
    highEntityReport: "insights/singleEntityHighLevelReport/",
    schoolReport:'programOperations/entityReport/',
   assessorReport:'programOperations/assessorReport/',
    reportSummary:'programOperations/entitySummary/',
   reportFilter:'programOperations/reportFilters/',
    // profileSummary:'programOperations/managerProfile/'

    profileSummary:'programOperations/userProfile/',
    multiEntityHighLevelReport: "insights/multiEntityHighLevelReport/",
    multiEntityDrillDownLevelReport: "insights/multiEntityDrillDownReport/",
    shareLinkApi: environment.apibaseurl + "sharedLinks/generate",
    publicSharedBaseUrl: "http://localhost:4200/public/",
    errorMessage: "Some thing went Wrong..",
    verifyLinkId : environment.apibaseurl + "sharedLinks/verify"
}
