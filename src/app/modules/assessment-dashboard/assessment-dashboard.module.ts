import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentRoutingModule } from './assesment-routing.module';
import { MatDividerModule,MatToolbarModule, MatSidenavModule } from '@angular/material';
import { CoreModule } from 'shikshalokam';
import { AssessmentHomeComponent } from './assessment-home/assessment-home.component';
import { MatCardModule } from '@angular/material';
@NgModule({
  declarations: [AssessmentDashboardComponent,AssessmentHomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatDividerModule,
    AssessmentRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
  ],
})
export class AssessmentDashboardModule { }
