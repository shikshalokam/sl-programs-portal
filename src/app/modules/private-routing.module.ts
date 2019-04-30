import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.component';
const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    data: { breadcrumb: "" },
    children: [
      {
        path: 'report',
        data: {
          id: 'report',
        },
        loadChildren: './report/report.module#ReportsModule'
      },
      {
        path: 'home', component: HomeComponent,
        data: {
        }
      },

      {
        path: 'operations',
        data: {
          id: 'operations',
        },
        loadChildren: './operations/operations.module#OperationsModule'
      },
      {
        path: 'workspace',
        data: {
          id: 'workspace',
        },
        loadChildren: './workspace/workspace.module#WorkspaceModule'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      // {
      //   path:"**",
      //   component:HomeComponent
      // }
     
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
