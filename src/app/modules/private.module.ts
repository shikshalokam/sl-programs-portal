import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule,TranslateService,SharedModule } from 'shikshalokam';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { ProgramsDashboardComponent } from './modules/programs-dashboard/programs-dashboard.component';
import { MatToolbarModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AuthService } from './private-modules/auth-service/auth.service';
import { PrivateComponent } from './private.component';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from './private-modules/interceptor-service/interceptor.service';

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }


// export function authFactory(authService: AuthService) {
//   return () => authService.init();
// }

@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
  ],
  imports: [
    PrivateRoutingModule,
    SharedModule,
    // CoreModule,
    MatDividerModule,
    CoreModule.forRoot(),
    HttpClientModule,
    // BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //   }
    // }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: authFactory,
    //   multi: true,
    //   deps: [AuthService]
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true
    // },

  ],
  // entryComponents: [PrivateR],
  // exports:[PrivateComponent],
  bootstrap: [PrivateComponent]
})


export class PrivateModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PrivateModule,
      providers: [ ]
    };
  }
}
