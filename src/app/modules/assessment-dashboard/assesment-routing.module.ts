import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import{AssessmentHomeComponent}from './assessment-home/assessment-home.component';
const routes: Routes = [
  {
    path: '',
    component: AssessmentDashboardComponent,
    canActivate : [AuthGuard],
    children: [
      // {
      //   path: 'parent',
      //   loadChildren: '../modules/parent-interview/parent-interview.module#ParentInterviewModule'
      // },
      {
        path: 'report',
        loadChildren: '../report/report.module#ReportModule'
      },
      {
      path:'Home',
      pathMatch:'full',
      component: AssessmentHomeComponent,
    },
     
      {
        path: 'operations',
        loadChildren: '../operations/operations.module#OperationsModule'
      },
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: 'Home', component: AssessmentHomeComponent,
        
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule {
  constructor(){
  }
 }

