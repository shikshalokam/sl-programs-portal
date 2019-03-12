import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { ReportDashboardComponent } from './reports-dashboard/report-dashboard.component';
import { EntityReportComponent } from './entity-report/entity-report.component';

const routes: Routes = [
  {
    path: '', component: ReportComponent,
    // canActivate: [AuthGuard],
    // data: {id:'report'},
    children: [
      {
        path: 'school-list',
        data: {id:'schoolList'},
        canActivateChild:[AuthGuard],
        component: SchoolListComponent,
      },
      {
        path: 'ecm-report/:name/:id',
        data: {id:'ecmReport'},
        canActivateChild:[AuthGuard],
        component: EcmReportComponent,
       
      },
      {
        path: 'download-evedince-report',
        data: {id:'downloadEvedienceReport'},
        canActivateChild:[AuthGuard],
        component: DownloadReportComponent,
       
      },
      {
        path:'report-dashboard',
        component:ReportDashboardComponent,
      },
      {
        path: '',
        redirectTo: 'report-dashboard'
      },
      {
        path:'entity-report',
        component:EntityReportComponent,
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
