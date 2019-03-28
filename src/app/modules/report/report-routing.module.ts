import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { ReportDashboardComponent } from './reports-dashboard/report-dashboard.component';
import { EntityReportComponent } from './entity-report/entity-report.component';
import { SchoolsComponent } from './entity-report/components/schools/schools.component';
const routes: Routes = [
  {
    path: '', component: ReportComponent,
    canActivate: [AuthGuard],
    data: {
      id:'report',
      breadcrumb:'headings.reports'
  },
    children: [
      {
        path: 'school-list',
        data: {
          id:'schoolList',
          breadcrumb:'headings.schoolListHeading'
        },
        canActivateChild:[AuthGuard],
        component: SchoolListComponent,
      },
      {
        path: 'ecm-report/:name/:id',
        data: {
          id:'ecmReport',
          breadcrumb:'headings.ecmReportsHeading'
        },
        canActivateChild:[AuthGuard],
        component: EcmReportComponent,
       
      },
      {
        path: 'download-evedince-report',
        data: {
          id:'downloadEvedienceReport',
          breadcrumb:'headings.downloadReport'
        },
        canActivateChild:[AuthGuard],
        component: DownloadReportComponent,
       
      },
      {
        path:'report-dashboard',
        data:{
          id:"reportDashBoard",
          // breadcrumb:'Report DashBoard'
        },
        component:ReportDashboardComponent,
      },
      {
        path: '',
        redirectTo: 'report-dashboard'
      },
      {
        path:'entity-report',
        data:{
          id:"entityReport",
          breadcrumb:'headings.reportEntityReport'
        },
        component:EntityReportComponent,
      },
      {
        path: 'schools',
        data: {
          id:'schools',
          breadcrumb:'headings.schoolListHeading'
        },
        canActivateChild:[AuthGuard],
        component: SchoolsComponent,
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
