import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicModulesComponent } from './public.component';
import { environment } from 'src/environments/environment';
import { EntityReportComponent, MultipleEntityRportComponent, MultipleEntityDrilldownReportComponent, HighlevelEntityReportComponent, OpsReportComponent } from 'shikshalokam';
import { AuthGuard } from '../modules/private-modules/auth-gaurd/auth.gaurd';
import { SchoolsComponent } from '../modules/report/schools/schools.component';
import { FrameworkStructureRubricDefintionComponent } from '../modules/report/framework-structure-rubric-defintion/framework-structure-rubric-defintion.component';
import { PublicConfig } from './public.config';
import { BaseComponent } from './base/base.component';
const routes: Routes = [
  {
    path:'',
    component : PublicModulesComponent,
    children:[
      {
        path:'',
        component:BaseComponent
      },
      {
        path: 'entity-report/:entityId',
        data: {
          componentId: "insights",
          apibaseUrl: environment.apibaseurl,
          reportConfig: PublicConfig,
          globalConfig: PublicConfig, 
          shareLinkApi: PublicConfig.shareLinkApi, 
          publicSharedBaseUrl:PublicConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportEntityReport'
        },
        component: EntityReportComponent,
      },
      {
        path: 'multiple-entity-report',
        data: {
          componentId: "insights",
          apibaseUrl: environment.apibaseurl,
          reportConfig: PublicConfig,
          globalConfig: PublicConfig, 
          shareLinkApi: PublicConfig.shareLinkApi, 
          publicSharedBaseUrl:PublicConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportMiltipleEntityReport'
        },
        component: MultipleEntityRportComponent,
      },
      {
        path: 'multiple-entity-drilldown-report',
        data: {
          componentId: "insights",
          apibaseUrl: environment.apibaseurl,
          reportConfig: PublicConfig,
          globalConfig: PublicConfig, 
          shareLinkApi: PublicConfig.shareLinkApi, 
          publicSharedBaseUrl:PublicConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.reportMultilpeEntityDrillldownReport'
        },
        component: MultipleEntityDrilldownReportComponent,
      },
      {
        path: 'highlevel-entity-report/:entityId',
        data: {
          componentId: 'insights',
          apibaseUrl: environment.apibaseurl,
          reportConfig: PublicConfig,
          globalConfig: PublicConfig, 
          shareLinkApi: PublicConfig.shareLinkApi, 
          publicSharedBaseUrl:PublicConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.highlevelEntityReport'
        },
        component: HighlevelEntityReportComponent,
      },
      {
        path: 'ops-reports',
        data: {
          componentId: 'programsOperations',
          apibaseUrl: environment.apibaseurl,
          reportConfig: PublicConfig,
          globalConfig: PublicConfig, 
          shareLinkApi: PublicConfig.shareLinkApi, 
          noAssess : true,
          publicSharedBaseUrl:PublicConfig.publicSharedBaseUrl ,
          breadcrumb: 'headings.opsReport'
        },

        component: OpsReportComponent
      },
    ]
  }
]
@NgModule({
  // declarations:[
  //     EntityReportComponent, MultipleEntityRportComponent,
  //     HighlevelEntityReportComponent, MultipleEntityDrilldownReportComponent
  // ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
