import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsDashboardComponent } from './modules/programs-dashboard/programs-dashboard.component';
import { OperationsDashboardComponent } from './modules/operations/operations-dashboard/operations-dashboard.component';
   
const routes: Routes = [
  {
    // path: 'assesments/:programId/:assesmentId',
    path: 'assessments',
    // component: AssessmentDashboardComponent
    
    loadChildren: './modules/assessment-dashboard/assessment-dashboard.module#AssessmentDashboardModule'
  },
  {
    path: 'programs',
    component : ProgramsDashboardComponent
  },
  {
    path: '',
    redirectTo: 'programs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
