import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    // component: AppComponent,
    data:{breadcrumb : ""},
    children: [
      {
        path: 'report',
        data:{
          id:'report',
          // breadcrumb:'Reports'

      },
        loadChildren: './modules/report/report.module#ReportModule'
      },
     
      {
        path: 'operations',
        data:{
          id:'operations',
          // breadcrumb:'Operations'
      },
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
        path: 'home', component: HomeComponent,
        data:{
          // breadcrumb :'Home'
        }
        
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
