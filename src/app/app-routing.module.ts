import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PrivateModule } from './modules/private-modules/private.module';
import { PrivateComponent } from './modules/private.component';
import { PublicModulesComponent } from './public-modules/public.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './modules/private-modules/auth-gaurd/auth.gaurd';
const routes: Routes = [
  {
    path: '',
    data: {
      id: 'private',
    },
    loadChildren: './modules/private.module#PrivateModule',
    canActivate: [AuthGuard],
    // component:PrivateComponent
   },
  {
    path: 'public',
    loadChildren: './public-modules/public.module#PublicModule'

  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
 

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
