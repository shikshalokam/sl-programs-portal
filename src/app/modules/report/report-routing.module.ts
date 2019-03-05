import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';

const routes: Routes = [
  {
    path: '', component: ReportComponent,
    // canActivate: [AuthGuard],
    data: {},
    children: [
      {
        path: 'school-list',
        component: SchoolListComponent,
      },
      {
        path: 'ecm-report/:name/:id',
        component: EcmReportComponent,
       
      },
      {
        path: 'download-evedince-report',
        component: DownloadReportComponent,
       
      },
      {
        path: '**',
        redirectTo: 'school-list'
      }
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
