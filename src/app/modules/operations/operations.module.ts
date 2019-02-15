import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { UploadingCsvComponent } from './uploading-csv/uploading-csv.component';
import { MatInputModule,MatSelectModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, MatTableModule } from '@angular/material';
import { CoreModule } from 'src/app/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule} from "angular-progress-bar"
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewSchoolsComponent } from './view-schools/view-schools.component';
import { OperationsDashboardComponent } from './operations-dashboard/operations-dashboard.component';

@NgModule({
  declarations: [OperationsComponent, UploadingCsvComponent, ViewSchoolsComponent, OperationsDashboardComponent],
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
    MatTableModule
  ]
,
// providers:[MatFileUploadModule]
})
export class OperationsModule { }
