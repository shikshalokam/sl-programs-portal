import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';
import { SchoolListComponent } from './school-list/school-list.component';
import { CoreModule, SharedModule } from 'shikshalokam';
import { MatSelectModule, MatTooltipModule, MatTableModule, MatDialogModule, MatExpansionModule, MatTabsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatDividerModule, MatSortModule, MatListModule } from '@angular/material';
import { EcmReportComponent } from './ecm-report/ecm-report.component';
import { ImageModalComponent } from './ecm-report/image-modal/image-modal.component';
import { DownloadReportComponent } from './download-report/download-report.component';
import { ReportDashboardComponent } from './reports-dashboard/report-dashboard.component';
import { SelectProgramComponent } from './reports-dashboard/select-program/select-program.component';
import { EntityReportComponent } from './entity-report/entity-report.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { SchoolsComponent } from './entity-report/components/schools/schools.component';
import { MultipleEntityRportComponent } from './multiple-entity-rport/multiple-entity-rport.component';
import { HighlevelEntityReportComponent } from './highlevel-entity-report/highlevel-entity-report.component';
import { FrameworkStructureRubricDefintionComponent } from './framework-structure-rubric-defintion/framework-structure-rubric-defintion.component';

@NgModule({
  declarations: [
    ReportComponent,
    SchoolListComponent,
    EcmReportComponent,
    ImageModalComponent,
    DownloadReportComponent,
    ReportDashboardComponent, SelectProgramComponent, EntityReportComponent, SchoolsComponent, MultipleEntityRportComponent, HighlevelEntityReportComponent, FrameworkStructureRubricDefintionComponent
  ],
  imports: [
    // CommonModule,
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
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


  ],
  entryComponents: [ImageModalComponent, SelectProgramComponent],

  providers: [
  ],
})
export class ReportModule { }
