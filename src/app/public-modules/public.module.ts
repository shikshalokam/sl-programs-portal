import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModulesComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { HighlevelEntityReportComponent, EntityReportComponent, MultipleEntityRportComponent, MultipleEntityDrilldownReportComponent, CoreModule, SharedModule, ReportModule } from 'shikshalokam';
import { MatCardModule, MatDividerModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatDialogModule, MatTableModule, MatTooltipModule, MatCheckboxModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatBottomSheetModule } from '@angular/material';
import { GoogleChartsModule } from 'angular-google-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { PublicInterceptor } from './interceptor-service/interceptor.service';
import { BaseComponent } from './base/base.component';
import { ApiInterceptor } from '../modules/private-modules/interceptor-service/interceptor.service';

@NgModule({
  declarations: [
    PublicModulesComponent,
    BaseComponent,
    // EntityReportComponent, MultipleEntityRportComponent,
    // HighlevelEntityReportComponent, MultipleEntityDrilldownReportComponent
  ],
  imports: [
        // EntityReportComponent, MultipleEntityRportComponent,
    // HighlevelEntityReportComponent, MultipleEntityDrilldownReportComponent
    CommonModule,
    SharedModule,
    ReportModule,
    CoreModule.forRoot(),
    PublicRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    GoogleChartsModule.forRoot(),
    MatProgressSpinnerModule,
    MatBottomSheetModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
  ]
})
export class PublicModule { }
