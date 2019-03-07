import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadingCsvComponent } from './uploading-csv/uploading-csv.component';
import { ViewSchoolsComponent } from './view-schools/view-schools.component';
import { OperationsDashboardComponent } from './operations-dashboard/operations-dashboard.component';
import { ViewAssessorsComponent } from './view-assessors/view-assessors.component';
import { OperationsComponent } from './operations.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { InsideReportComponent } from './inside-report/inside-report.component';

const routes: Routes = [

  {  path: '', 
      data :{id :'operations'},
      component : OperationsComponent,
      canActivate : [AuthGuard],
      children: [
      {
          path:'upload-csv',
          data:{id : 'uploadCsv'},
          canActivate : [AuthGuard],
          component : UploadingCsvComponent
      },
      { 
        path:'view-schools',
        data:{id:'viewSchools'},
        canActivate : [AuthGuard],
        component:ViewSchoolsComponent
      },
      { 
        path:'view-assessors',
        data:{id:'viewAssessors'},
        canActivate: [AuthGuard],

        component:ViewAssessorsComponent
      },
      { 
        path:'inside-report',
        data:{id:'insideReport'},
        canActivate: [AuthGuard],

        component:InsideReportComponent
      },
     {
        path:'operations-dashboard',
        component: OperationsDashboardComponent
      },

      {
        path:'',
        redirectTo : 'operations-dashboard',
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
