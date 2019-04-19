import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { AddProgramComponent } from './add-program/add-program.component';

const routes: Routes = [

  {
    path: '',
    data: {
      id: 'workSpace',
      breadcrumb: 'headings.workSpace'
    },
    component: WorkspaceComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-program',
        data: {
          id: 'addProgram',
          breadcrumb: 'headings.addProgram'

        },
        canActivate: [AuthGuard],
        component: AddProgramComponent
      },
      
      {
        path: 'workspace-dashboard',
        data: {
          // breadcrumb:'Operations Dashboard'
        },
        component: WorkspaceDashboardComponent
      },

      {
        path: '',
        redirectTo: 'workspace-dashboard',
        pathMatch: 'full'

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
