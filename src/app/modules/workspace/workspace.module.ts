import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule, CoreModule } from 'shikshalokam';
import { AddProgramMetaDataComponent } from './add-program-meta-data/add-program-meta-data.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatBottomSheetModule, MatListModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatTooltipModule, MatStepperModule, MatTabsModule, MatChipsModule, MatTableModule } from '@angular/material';
import { ProgramActionSheetComponent } from './add-program/action-sheet/program-action-sheet.component';
import { SelectSolutionComponent } from './add-program/select-solution/select-solution.component';
import { ProgressBarModule } from "angular-progress-bar";
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { SolutionDetailsComponent } from './solution-details/solution-details.component'

@NgModule({
  declarations: [WorkspaceDashboardComponent, WorkspaceComponent, AddProgramMetaDataComponent, AddProgramComponent, ProgramActionSheetComponent, SelectSolutionComponent, ProgramDetailsComponent, SolutionDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    WorkspaceRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    ProgressBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [AddProgramMetaDataComponent, ProgramActionSheetComponent]
})
export class WorkspaceModule { }
