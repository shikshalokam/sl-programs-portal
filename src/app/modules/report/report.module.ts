import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { MatSelectModule, MatTooltipModule, MatTableModule, MatDialogModule, MatExpansionModule, MatTabsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatDividerModule, MatSortModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { CoreModule, SharedModule, HighlevelEntityReportComponent, EntityReportComponent, MultipleEntityRportComponent, MultipleEntityDrilldownReportComponent } from 'shikshalokam';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { ImageModalComponent } from './ecm-report/image-modal/image-modal.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { ReportDashboardComponent } from './reports-dashboard/report-dashboard.component';
import { SelectProgramComponent } from './reports-dashboard/select-program/select-program.component';
import { GoogleChartsModule } from 'angular-google-charts';
// import { ColumnGraphComponent } from './entity-report/components/column-graph/column-graph.component';
import { BlockListComponent } from './block-list/block-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ActionSheetComponent } from './action-sheet/action-sheet.component';
import { FrameworkStructureRubricDefintionComponent } from './framework-structure-rubric-defintion/framework-structure-rubric-defintion.component';
 import {ReportModule} from 'shikshalokam';
import { SchoolsComponent } from './schools/schools.component';
@NgModule({
  declarations: [
    ReportComponent,
    SchoolListComponent,
    EcmReportComponent,
    SchoolsComponent,
    ImageModalComponent,
    DownloadReportComponent,
    ReportDashboardComponent, SelectProgramComponent,BlockListComponent,ActionSheetComponent,
    FrameworkStructureRubricDefintionComponent,
    // HighlevelEntityReportComponent, EntityReportComponent
    // , MultipleEntityDrilldownReportComponent,MultipleEntityRportComponent
  ],
  imports: [
    // CommonModule,
    ReportModule.forRoot(),
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    CoreModule,
    MatPaginatorModule,
    ReportRoutingModule,
    MatSortModule,
    MatListModule,
    GoogleChartsModule.forRoot(),
    MatProgressSpinnerModule,
    MatBottomSheetModule

  ],
  entryComponents: [ImageModalComponent, SelectProgramComponent, ActionSheetComponent],
  providers: [
  ],
})
export class ReportsModule { }
