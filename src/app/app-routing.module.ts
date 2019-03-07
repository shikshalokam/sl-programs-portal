import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
