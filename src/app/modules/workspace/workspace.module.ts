import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule, CoreModule } from 'shikshalokam';
import { AddProgramMetaDataComponent } from './add-program-meta-data/add-program-meta-data.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatBottomSheetModule, MatListModule } from '@angular/material';
import { ProgramActionSheetComponent } from './add-program/action-sheet/program-action-sheet.component';

@NgModule({
  declarations: [WorkspaceDashboardComponent,WorkspaceComponent, AddProgramMetaDataComponent, AddProgramComponent, ProgramActionSheetComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    WorkspaceRoutingModule,
    MatButtonModule,
    MatDatepickerModule, 
    MatNativeDateModule ,
    MatSidenavModule,
    MatBottomSheetModule,
    MatListModule
  ],
  providers:[MatDatepickerModule],
  entryComponents:[AddProgramMetaDataComponent,ProgramActionSheetComponent]
})
export class WorkspaceModule { }
