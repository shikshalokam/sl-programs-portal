import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { ReportDashboardComponent } from './reports-dashboard/report-dashboard.component';
import { SchoolsComponent } from './entity-report/components/schools/schools.component';
import { BlockListComponent } from './block-list/block-list.component';
import { FrameworkStructureRubricDefintionComponent } from './framework-structure-rubric-defintion/framework-structure-rubric-defintion.component';
import { environment } from 'src/environments/environment';
import { ReportConfig } from './report-config';
import { EntityReportComponent, MultipleEntityRportComponent, MultipleEntityDrilldownReportComponent, HighlevelEntityReportComponent } from 'shikshalokam';
import { GlobalConfig } from '../global-config';
const routes: Routes = [
  {
    path: '', component: ReportComponent,
    canActivate: [AuthGuard],
    data: {
      id: 'report',
      breadcrumb: 'headings.reports'
    },
    children: [
      {
        path: 'school-list',
        data: {
          id: 'schoolList',
          breadcrumb: 'headings.schoolListHeading'
        },
        canActivateChild: [AuthGuard],
        component: SchoolListComponent,
      },

      {
        path: 'block-list',
        data: {
          id: 'blockList',
          breadcrumb: 'headings.blockListHeading'
        },
        canActivateChild: [AuthGuard],
        component: BlockListComponent,
      },
      {
        path: 'ecm-report/:name/:id',
        data: {
          id: 'ecmReport',
          breadcrumb: 'headings.ecmReportsHeading'
        },
        canActivateChild: [AuthGuard],
        component: EcmReportComponent,

      },
      {
        path: 'download-evedince-report',
        data: {
          id: "downloadEvidienceReport",
          breadcrumb: 'headings.downloadReport'
        },
        canActivateChild: [AuthGuard],
        component: DownloadReportComponent,

      },
      {
        path: 'report-dashboard',
        data: {
          id: "reportDashBoard",
          // breadcrumb:'Report DashBoard'
        },
        component: ReportDashboardComponent,
      },
      {
        path: '',
        redirectTo: 'report-dashboard'
      },
      {
        path: 'entity-report/:schoolId',
        data: {
          id: "entityReport",
          apibaseUrl: environment.apibaseurl,
          reportConfig: ReportConfig,
          shareLinkApi: GlobalConfig.shareLinkApi, 
          publicSharedBaseUrl:GlobalConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportEntityReport'
        },
        component: EntityReportComponent,
      },
      {
        path: 'multiple-entity-report',
        data: {
          id: "multipleEntityReport",
          apibaseUrl: environment.apibaseurl,
          reportConfig: ReportConfig,
          shareLinkApi: GlobalConfig.shareLinkApi, 
          publicSharedBaseUrl:GlobalConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportMiltipleEntityReport'
        },
        component: MultipleEntityRportComponent,
      },
      {
        path: 'multiple-entity-drilldown-report',
        data: {
          id: "multipleEntityDrilldownReport",
          apibaseUrl: environment.apibaseurl,
          reportConfig: ReportConfig,
          shareLinkApi: GlobalConfig.shareLinkApi, 
          publicSharedBaseUrl:GlobalConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportMultilpeEntityDrillldownReport'
        },
        component: MultipleEntityDrilldownReportComponent,
      },

      {
        path: 'schools',
        data: {
          id: 'schools',
          apibaseUrl: environment.apibaseurl,
          reportConfig: ReportConfig,
          breadcrumb: 'headings.schoolListHeading'
        },
        canActivateChild: [AuthGuard],
        component: SchoolsComponent,
      },
      {
        path: 'highlevel-entity-report/:schoolId',
        data: {
          id: 'highlevelEntityReport',
          apibaseUrl: environment.apibaseurl,
          reportConfig: ReportConfig,
          shareLinkApi: GlobalConfig.shareLinkApi, 
          publicSharedBaseUrl:GlobalConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.highlevelEntityReport'
        },
        canActivateChild: [AuthGuard],
        component: HighlevelEntityReportComponent,
      },
      {
        path: 'framework-rubric',
        data: {
          id: 'frameWorkStructureRubricLevel',
          breadcrumb: 'headings.frameWorkStructureRubricLevel'
        },
        canActivateChild: [AuthGuard],
        component: FrameworkStructureRubricDefintionComponent,
      },
    ]
  },

  // {
  //   path: '**',
  //   redirectTo: 'report'
  // }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
