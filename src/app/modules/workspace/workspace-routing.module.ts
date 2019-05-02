import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../private-modules/auth-gaurd/auth.gaurd';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { SelectSolutionComponent } from './add-program/select-solution/select-solution.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { SolutionDetailsComponent } from './solution-details/solution-details.component';

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
        path: 'select-solution',
        data: {
          id: 'selectSolution',
          breadcrumb: 'headings.selectSolution'

        },
        // canActivate: [AuthGuard],
        component: SelectSolutionComponent
      },
      
      {
        path: 'workspace-dashboard',
        data: {
          // breadcrumb:'headings.workspaceDashboard'
        },
        component: WorkspaceDashboardComponent
      },
      {
        path: 'program-details',
        data: {
          breadcrumb:'headings.programDetails'
        },
        component: ProgramDetailsComponent
      },
      {
        path: 'solution-details',
        data: {
          breadcrumb:'headings.solutionDetails'
        },
        component: SolutionDetailsComponent
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
