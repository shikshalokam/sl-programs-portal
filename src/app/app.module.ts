import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule,TranslateService,SharedModule, HighlevelEntityReportComponent, EntityReportComponent, MultipleEntityRportComponent, MultipleEntityDrilldownReportComponent, ReportModule } from 'shikshalokam';
import { AuthService } from './modules/private-modules/auth-service/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { ProgramsDashboardComponent } from './modules/programs-dashboard/programs-dashboard.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule, MatListModule } from '@angular/material';
import { HomeComponent } from './modules/home/home.component';
import { ApiInterceptor } from './modules/private-modules/interceptor-service/interceptor.service';
import { PrivateModule } from './modules/private.module';
import { PrivateComponent } from './modules/private.component';
import { PublicModulesComponent } from './public-modules/public.component';
import { PublicModule } from './public-modules/public.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


export function authFactory(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    // EntityReportComponent, 
    // MultipleEntityRportComponent,
    // HighlevelEntityReportComponent, MultipleEntityDrilldownReportComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    // ReportModule.forRoot(),
    // PrivateModule,
    // CoreModule,
    // MatDividerModule,
    CoreModule.forRoot(),
    // HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: authFactory,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
  
    
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
