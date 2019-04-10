import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadingCsvComponent } from './uploading-csv/uploading-csv.component';
import { ViewSchoolsComponent } from './view-schools/view-schools.component';
import { OperationsDashboardComponent } from './operations-dashboard/operations-dashboard.component';
import { ViewAssessorsComponent } from './view-assessors/view-assessors.component';
import { OperationsComponent } from './operations.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { OpsReportComponent } from 'shikshalokam';
import { environment } from 'src/environments/environment';
import { OperationConfig } from './operations.config';
import { GlobalConfig } from '../global-config';
// import { OpsReportComponent } from './ops-report/ops-report.component';

const routes: Routes = [

  {
    path: '',
    data: {
      id: 'operations',
      breadcrumb: 'headings.operations'
    },
    component: OperationsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'upload-csv',
        data: {
          id: 'uploadcsv',
          breadcrumb: 'headings.uploadingCsv'

        },
        canActivate: [AuthGuard],
        component: UploadingCsvComponent
      },
      {
        path: 'view-schools',
        data: {
          id: 'viewSchools',
          breadcrumb: 'headings.viewSchools'
        },
        canActivate: [AuthGuard],
        component: ViewSchoolsComponent

      },
      {
        path: 'view-assessors',
        data: {
          id: 'viewAcessor',
          breadcrumb: 'headings.assessorListHeading'
        },
        canActivate: [AuthGuard],

        component: ViewAssessorsComponent
      },
      {
        path: 'reports',
        data: {
          id: 'opsReport',
          apibaseUrl: environment.apibaseurl,
          reportConfig: OperationConfig,
          shareLinkApi: GlobalConfig.shareLinkApi, 
          publicSharedBaseUrl:GlobalConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.opsReport'
        },
        canActivate: [AuthGuard],

        component: OpsReportComponent
      },
      {
        path: 'operations-dashboard',
        data: {
          // breadcrumb:'Operations Dashboard'
        },
        component: OperationsDashboardComponent
      },

      {
        path: '',
        redirectTo: 'operations-dashboard',
        pathMatch: 'full'

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
