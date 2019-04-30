import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule, CoreModule } from 'shikshalokam';
import { AddProgramMetaDataComponent } from './add-program-meta-data/add-program-meta-data.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatBottomSheetModule, MatListModule, MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatTooltipModule, MatStepperModule, MatTabsModule } from '@angular/material';
import { ProgramActionSheetComponent } from './add-program/action-sheet/program-action-sheet.component';
import { SelectSolutionComponent } from './add-program/select-solution/select-solution.component';
import { ProgressBarModule } from "angular-progress-bar"

@NgModule({
  declarations: [WorkspaceDashboardComponent, WorkspaceComponent, AddProgramMetaDataComponent, AddProgramComponent, ProgramActionSheetComponent, SelectSolutionComponent],
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
    MatTabsModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [AddProgramMetaDataComponent, ProgramActionSheetComponent]
})
export class WorkspaceModule { }
