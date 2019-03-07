import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { UploadingCsvComponent } from './uploading-csv/uploading-csv.component';
import { MatInputModule,MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, MatTableModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule} from "angular-progress-bar"
import { SharedModule,CoreModule } from 'shikshalokam';
import { ViewSchoolsComponent } from './view-schools/view-schools.component';
import { OperationsDashboardComponent } from './operations-dashboard/operations-dashboard.component';
import { ViewAssessorsComponent } from './view-assessors/view-assessors.component';
import { SelectProgramComponent } from './operations-dashboard/select-program/select-program.component';
import { InsideReportComponent } from './inside-report/inside-report.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [OperationsComponent, UploadingCsvComponent, ViewSchoolsComponent, OperationsDashboardComponent, ViewAssessorsComponent, SelectProgramComponent, InsideReportComponent],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MatInputModule,
    MatSelectModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule,
    MatButtonModule,
    SharedModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTableModule,
    MatDialogModule,
    GoogleChartsModule.forRoot('AIzaSyCpjV3kqGWqhqzG0pyftqcwIEG1y3nVFW0'),
  ]
,

entryComponents:[SelectProgramComponent]
// providers:[MatFileUploadModule]
})
export class OperationsModule { }
