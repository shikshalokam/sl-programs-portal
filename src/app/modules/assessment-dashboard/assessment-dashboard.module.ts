import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentRoutingModule } from './assesment-routing.module';
import { MatDividerModule,MatToolbarModule, MatSidenavModule } from '@angular/material';
import { CoreModule } from 'shikshalokam';

@NgModule({
  declarations: [AssessmentDashboardComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatDividerModule,
    AssessmentRoutingModule,
    MatToolbarModule,
    MatSidenavModule

  ]
})
export class AssessmentDashboardModule {

 }
