import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule,TranslateService } from 'shikshalokam';
import { SharedModule } from 'shikshalokam';
import { AuthService } from './modules/private-modules/auth-service/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProgramsDashboardComponent } from './modules/programs-dashboard/programs-dashboard.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule } from '@angular/material';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}


export function authFactory(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ProgramsDashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MatDividerModule,
    CoreModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: authFactory,
      multi: true,
      deps: [AuthService]
    },

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
