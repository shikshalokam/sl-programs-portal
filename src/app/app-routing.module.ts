import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
   
// const routes: Routes = [
//   {
//     // path: 'assesments/:programId/:assesmentId',
//     path: 'assessments',
//     // component: AssessmentDashboardComponent
    
//     loadChildren: './modules/assessment-dashboard/assessment-dashboard.module#AssessmentDashboardModule'
//   },
//   // {
//   //   path: 'programs',
//   //   component : ProgramsDashboardComponent
//   // },
//   {
//     path: '',
//     redirectTo: 'assessments',
//     pathMatch: 'full'
//   }
// ];


const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    children: [
      {
        path: 'report',
        data:{id:'report'},
        loadChildren: './modules/report/report.module#ReportModule'
      },
     
      {
        path: 'operations',
        data:{id:'operations'},
        loadChildren: './modules/operations/operations.module#OperationsModule'
      },
      {
        path: '',
        redirectTo: 'operations',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'operations',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
