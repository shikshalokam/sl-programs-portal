import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentHomeComponent } from './assessment-home/assessment-home.component';
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
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', component: AssessmentHomeComponent,
        
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
